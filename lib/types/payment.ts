// Payment Gateway Types
export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  experience: string;
  interests: string;
  additionalInfo: string;
  event: string;
}

export interface MultiEventPaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  selectedEvents: string[];
}

export interface CreateOrderRequest {
  orderId: string;
  orderAmount: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventName: string;
  teammates?: Array<{
    name: string;
    email: string;
    phone: string;
  }>;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  paymentSessionId: string;
  orderStatus: string;
  error?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  payments: any[];
  error?: string;
}

export interface PaymentWebhookData {
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

// Event pricing configuration
export interface EventPricing {
  [key: string]: {
    amount: number;
    currency: string;
    description: string;
  };
}

export const EVENT_PRICING: EventPricing = {
  "code-loom": {
    amount: 100,
    currency: "INR",
    description: "Code Loom Registration Fee",
  },
  "beat-verse": {
    amount: 100,
    currency: "INR",
    description: "Beat Verse Registration Fee",
  },
  "click-clash": {
    amount: 50,
    currency: "INR",
    description: "Click Clash Registration Fee",
  },
  "bug-x": {
    amount: 100,
    currency: "INR",
    description: "Bug X Registration Fee",
  },
  "play-grid": {
    amount: 100,
    currency: "INR",
    description: "Play Grid Registration Fee",
  },
  "idea-synth": {
    amount: 100,
    currency: "INR",
    description: "Idea Synth Registration Fee",
  },
  "trail-hack": {
    amount: 400,
    currency: "INR",
    description: "Trail Hack Registration Fee",
  },
  "clip-forge": {
    amount: 200,
    currency: "INR",
    description: "Clip Forge Registration Fee",
  },
  trialis: {
    amount: 50,
    currency: "INR",
    description: "Trialis Registration Fee",
  },
  golazo: {
    amount: 100,
    currency: "INR",
    description: "Goalazo Registration Fee",
  },
};
