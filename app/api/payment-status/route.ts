import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { z } from "zod";

// Zod validation schema for payment status request
const PaymentStatusSchema = z.object({
  orderId: z
    .string()
    .min(1, "Order ID is required")
    .max(100, "Order ID must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Order ID can only contain letters, numbers, hyphens, and underscores"
    ),
});

interface PaymentStatusRequest {
  orderId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input using Zod schema
    const validationResult = PaymentStatusSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      console.error("Validation errors:", errors);

      return NextResponse.json(
        {
          error: "Invalid input data",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { orderId } = validationResult.data;

    // Get environment variables
    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const environment = process.env.CASHFREE_ENVIRONMENT || "sandbox";

    if (!appId || !secretKey) {
      return NextResponse.json(
        { error: "Cashfree credentials not configured" },
        { status: 500 }
      );
    }

    // Initialize Cashfree SDK
    const cashfree = new Cashfree(
      environment === "production"
        ? CFEnvironment.PRODUCTION
        : CFEnvironment.SANDBOX,
      appId,
      secretKey
    );

    console.log("Fetching payment status for order:", orderId);

    // Fetch payment status using official SDK method
    const response = await cashfree.PGOrderFetchPayments(orderId);
    const result = response.data;

    console.log(
      "Payment status fetched successfully:",
      JSON.stringify(result, null, 2)
    );

    return NextResponse.json({
      success: true,
      payments: result,
    });
  } catch (error: any) {
    console.error("Error fetching payment status:", error);

    // Handle Cashfree SDK specific errors
    if (error.response) {
      console.error("Cashfree API Error:", {
        status: error.response.status,
        data: error.response.data,
      });

      return NextResponse.json(
        {
          error: "Failed to fetch payment status",
          details: error.response.data?.message || error.response.data,
          status: error.response.status,
        },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
