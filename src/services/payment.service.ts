// payment service
import { sendMail } from "./mail.service";

interface PaymentInfo {
  clientEmail: string;
  adminEmail: string;
  subject: string;
  message: string;
}

export const processPayment = async ({
  paymentInfo,
}: {
  paymentInfo: PaymentInfo;
}): Promise<{ success: boolean; message: string }> => {
  const { clientEmail, adminEmail, subject, message } = paymentInfo;

  try {
    // Send email to client
    sendMail({ to: clientEmail, subject, html: message });

    // Send email to admin
    sendMail({ to: adminEmail, subject, html: message });

    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    throw new Error("Failed to process payment and send emails");
  }
};
