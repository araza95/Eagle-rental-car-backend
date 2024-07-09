// Email templates
import { adminCarBookingTemplate } from "../email/admin-email.template";
import { customerCarBookingTemplate } from "../email/customer-email.template";

// Types
import { ADMIN_EMAIL_INTERFACE } from "../types/admin-email.interface";
import { CUSTOMER_EMAIL_INTERFACE } from "../types/customer-email.interface";

// Services
import { sendMail } from "./mail.service";

// Stripe
import Stripe from "stripe";

// Dotenv
import dotenv from "dotenv";

dotenv.config();

interface IProcessPayment {
  paymentMethod: string;
  customerEmailContent: CUSTOMER_EMAIL_INTERFACE;
  adminEmailContent: ADMIN_EMAIL_INTERFACE;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export const processPayment = async ({
  paymentMethod,
  customerEmailContent,
  adminEmailContent,
}: IProcessPayment): Promise<{
  success: boolean;
  message: string;
  paymentIntentClientSecret: string | null;
  paymentIntentStatus: string | null;
}> => {
  try {
    console.log(
      "🚀 ~ customerEmailContent.rateQuoted:",
      customerEmailContent.rateQuoted
    );
    // charge user for car booking using stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: customerEmailContent.rateQuoted * 100,
      currency: "usd",
      payment_method: paymentMethod,
      confirm: true,
      receipt_email: customerEmailContent.email,
      return_url: "https://eaglerentalcar.com/",
      metadata: {
        confirmationCode: customerEmailContent.confirmationNumber,
      },
    });

    console.log("🚀 ~ paymentIntent:", paymentIntent);

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Failed to process payment");
    }

    // Send email to client
    await sendMail({
      to:
        (customerEmailContent.email as string) ??
        (process.env.CLIENT_EMAIL as string),
      subject: `
        Booking Confirmation - ${customerEmailContent.vehicleType} - ${customerEmailContent.confirmationNumber}
      `,
      html: customerCarBookingTemplate(customerEmailContent),
    });

    // Send email to admin
    await sendMail({
      //   to: process.env.CLIENT_EMAIL as string,
      to: "alihaiderizvi.you@gmail.com",
      subject: " Booking Confirmation - New Car Booking",
      html: adminCarBookingTemplate(adminEmailContent),
    });

    return {
      success: true,
      message: "Emails sent successfully",
      paymentIntentClientSecret: paymentIntent.client_secret,
      paymentIntentStatus: paymentIntent.status,
    };
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to process payment and send emails");
  }
};
