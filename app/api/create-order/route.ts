import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { z } from "zod";

// Zod validation schema for create order request
const CreateOrderSchema = z.object({
  orderId: z
    .string()
    .min(1, "Order ID is required")
    .max(100, "Order ID must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Order ID can only contain letters, numbers, hyphens, and underscores"
    ),
  orderAmount: z
    .string()
    .min(1, "Order amount is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Order amount must be a valid number with up to 2 decimal places"
    )
    .refine((val) => {
      const num = parseFloat(val);
      return num > 0 && num <= 100000; // Max 1 lakh rupees
    }, "Order amount must be between 1 and 100,000"),
  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Customer name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Customer name can only contain letters and spaces"
    ),
  customerEmail: z
    .string()
    .min(1, "Customer email is required")
    .email("Invalid email format")
    .max(255, "Email must be less than 255 characters"),
  customerPhone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      return /^[6-9]\d{9}$/.test(val); // Indian phone number format
    }, "Phone number must be a valid 10-digit Indian number"),
  eventName: z
    .string()
    .min(1, "Event name is required")
    .max(200, "Event name must be less than 200 characters")
    .regex(/^[a-zA-Z0-9\s,.-]+$/, "Event name contains invalid characters"),
});

interface CreateOrderRequest {
  orderId: string;
  orderAmount: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventName: string;
}

interface CashfreeOrderResponse {
  orderId: string;
  paymentSessionId: string;
  orderStatus: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input using Zod schema
    const validationResult = CreateOrderSchema.safeParse(body);

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

    const {
      orderId,
      orderAmount,
      customerName,
      customerEmail,
      customerPhone,
      eventName,
    } = validationResult.data;

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

    // Prepare order data according to Cashfree SDK specification
    const orderData = {
      order_amount: parseFloat(orderAmount),
      order_currency: "INR",
      order_id: orderId,
      order_note: `Registration payment for ${eventName}`,
      customer_details: {
        customer_id: orderId, // Use orderId as customerId
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone || "",
      },
      order_meta: {
        return_url:
          process.env.PAYMENT_SUCCESS_URL ||
          "http://localhost:3001/payment-success",
        notify_url:
          process.env.WEBHOOK_URL ||
          "http://localhost:3001/api/payment-webhook",
      },
    };

    console.log(
      "Creating order with data:",
      JSON.stringify(orderData, null, 2)
    );

    // Create order with Cashfree SDK
    const response = await cashfree.PGCreateOrder(orderData);
    const result = response.data;

    console.log("Order created successfully:", JSON.stringify(result, null, 2));

    return NextResponse.json({
      success: true,
      orderId: result.order_id,
      paymentSessionId: result.payment_session_id,
      orderStatus: result.order_status,
    });
  } catch (error: any) {
    console.error("Error creating order:", error);

    // Handle Cashfree SDK specific errors
    if (error.response) {
      console.error("Cashfree API Error:", {
        status: error.response.status,
        data: error.response.data,
      });

      return NextResponse.json(
        {
          error: "Failed to create order with Cashfree",
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
