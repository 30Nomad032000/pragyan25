import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Zod validation schema for payment webhook data
const PaymentWebhookSchema = z.object({
  orderId: z
    .string()
    .min(1, "Order ID is required")
    .max(100, "Order ID must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Order ID can only contain letters, numbers, hyphens, and underscores"
    ),
  orderStatus: z.enum(["PAID", "ACTIVE", "EXPIRED"], {
    message: "Order status must be PAID, ACTIVE, or EXPIRED",
  }),
  paymentStatus: z.enum(["SUCCESS", "FAILED", "PENDING", "CANCELLED"], {
    message: "Payment status must be SUCCESS, FAILED, PENDING, or CANCELLED",
  }),
  paymentAmount: z
    .string()
    .min(1, "Payment amount is required")
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Payment amount must be a valid number with up to 2 decimal places"
    )
    .refine((val) => {
      const num = parseFloat(val);
      return num > 0 && num <= 100000; // Max 1 lakh rupees
    }, "Payment amount must be between 1 and 100,000"),
  paymentCurrency: z
    .string()
    .min(1, "Payment currency is required")
    .max(10, "Payment currency must be less than 10 characters")
    .regex(/^[A-Z]{3}$/, "Payment currency must be a 3-letter currency code"),
  paymentTime: z
    .string()
    .min(1, "Payment time is required")
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, "Payment time must be a valid date"),
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
});

interface PaymentWebhookData {
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
  paymentAmount: string;
  paymentCurrency: string;
  paymentTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input using Zod schema
    const validationResult = PaymentWebhookSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      console.error("Webhook validation errors:", errors);

      return NextResponse.json(
        {
          error: "Invalid webhook data",
          details: errors,
        },
        { status: 400 }
      );
    }

    const {
      orderId,
      orderStatus,
      paymentStatus,
      paymentAmount,
      customerEmail,
    } = validationResult.data;

    console.log("Payment webhook received:", {
      orderId,
      orderStatus,
      paymentStatus,
      paymentAmount,
      customerEmail,
    });

    // Verify webhook signature here (implement based on Cashfree documentation)
    // For now, we'll process the webhook data

    if (orderStatus === "PAID" && paymentStatus === "SUCCESS") {
      // Payment successful - update your database
      console.log(`Payment successful for order ${orderId}`);

      // Here you would typically:
      // 1. Update your database to mark the registration as paid
      // 2. Send confirmation email to customer
      // 3. Update registration status

      // Example database update (replace with your actual database logic):
      // await updateRegistrationStatus(orderId, 'paid')
      // await sendConfirmationEmail(customerEmail, orderId)
    } else if (orderStatus === "ACTIVE" && paymentStatus === "FAILED") {
      // Payment failed
      console.log(`Payment failed for order ${orderId}`);

      // Handle failed payment:
      // 1. Update registration status to failed
      // 2. Send failure notification email
      // 3. Log the failure for analysis
    } else {
      console.log(
        `Payment status update for order ${orderId}: ${orderStatus} - ${paymentStatus}`
      );
    }

    // Always return 200 OK to acknowledge receipt of webhook
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Error processing payment webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
