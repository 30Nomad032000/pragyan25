import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client-side registration functions
export const registerUser = async (userData: {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  organization: string;
  position?: string;
  experience?: string;
  interests?: string;
  additional_info?: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();

  if (error) {
    console.error("Error registering user:", error);
    throw error;
  }

  return data;
};

export const createRegistration = async (registrationData: {
  user_id: string;
  event_id: string;
  order_id: string;
  payment_amount: number;
  payment_currency: string;
  payment_session_id?: string;
  teammates?: any;
}) => {
  const { data, error } = await supabase
    .from("registrations")
    .insert([registrationData])
    .select()
    .single();

  if (error) {
    console.error("Error creating registration:", error);
    throw error;
  }

  return data;
};

export const createMultiEventRegistration = async (registrationData: {
  user_id: string;
  order_id: string;
  payment_amount: number;
  payment_currency: string;
  payment_session_id?: string;
  selected_events: string[];
}) => {
  const { data, error } = await supabase
    .from("multi_event_registrations")
    .insert([registrationData])
    .select()
    .single();

  if (error) {
    console.error("Error creating multi-event registration:", error);
    throw error;
  }

  return data;
};

export const updateRegistrationPaymentStatus = async (
  orderId: string,
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
) => {
  // Update single event registration
  const { error: regError } = await supabase
    .from("registrations")
    .update({ payment_status: paymentStatus })
    .eq("order_id", orderId);

  if (regError) {
    console.error("Error updating registration payment status:", regError);
  }

  // Update multi-event registration
  const { error: multiRegError } = await supabase
    .from("multi_event_registrations")
    .update({ payment_status: paymentStatus })
    .eq("order_id", orderId);

  if (multiRegError) {
    console.error(
      "Error updating multi-event registration payment status:",
      multiRegError
    );
  }

  return { regError, multiRegError };
};

export const getEventBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching event:", error);
    throw error;
  }

  return data;
};

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "not found" error
    console.error("Error fetching user:", error);
    throw error;
  }

  return data;
};

export const getRegistrationByOrderId = async (orderId: string) => {
  // Try single event registration first
  const { data: regData, error: regError } = await supabase
    .from("registrations")
    .select(
      `
      *,
      users (*),
      events (*)
    `
    )
    .eq("order_id", orderId)
    .single();

  if (regData) {
    return { type: "single", data: regData };
  }

  // Try multi-event registration
  const { data: multiRegData, error: multiRegError } = await supabase
    .from("multi_event_registrations")
    .select(
      `
      *,
      users (*)
    `
    )
    .eq("order_id", orderId)
    .single();

  if (multiRegData) {
    return { type: "multi", data: multiRegData };
  }

  return null;
};

export const getAllRegistrations = async () => {
  // Get single event registrations
  const { data: singleRegs, error: singleError } = await supabase
    .from("registrations")
    .select(
      `
      *,
      users (*),
      events (*)
    `
    );

  // Get multi-event registrations
  const { data: multiRegs, error: multiError } = await supabase
    .from("multi_event_registrations")
    .select(
      `
      *,
      users (*)
    `
    );

  if (singleError || multiError) {
    console.error("Error fetching registrations:", singleError || multiError);
    throw singleError || multiError;
  }

  // Combine and format the data
  const allRegistrations = [
    ...(singleRegs || []).map((reg) => ({
      id: reg.id,
      order_id: reg.order_id,
      type: "single" as const,
      data: {
        users: reg.users,
        events: reg.events,
        payment_amount: reg.payment_amount,
        payment_status: reg.payment_status,
        created_at: reg.created_at,
      },
    })),
    ...(multiRegs || []).map((reg) => ({
      id: reg.id,
      order_id: reg.order_id,
      type: "multiple" as const,
      data: {
        users: reg.users,
        selected_events: reg.selected_events,
        payment_amount: reg.payment_amount,
        payment_status: reg.payment_status,
        created_at: reg.created_at,
      },
    })),
  ];

  return allRegistrations;
};

export const getAllEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

  return data || [];
};

// Helper functions
export const generateConfirmationCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

export const formatEventName = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
