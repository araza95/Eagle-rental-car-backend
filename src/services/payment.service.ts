// payment service

// Email templates
import {
  IAdminMailInfo,
  adminCarBookingTemplate,
} from "../email/admin-email.template";
import {
  ICustomerMailInfo,
  customerCarBookingTemplate,
} from "../email/customer-email.template";

// Services
import { sendMail } from "./mail.service";

interface PaymentInfo {
  clientEmail: string;
  subject: string;
}

export const processPayment = async ({
  paymentInfo,
}: {
  paymentInfo: PaymentInfo;
}): Promise<{ success: boolean; message: string }> => {
  const { clientEmail, subject } = paymentInfo;

  try {
    const customerEmailContent: ICustomerMailInfo = {
      fullName: "John Doe",
      confirmationNumber: "ECR559",
      location: "Eagle Car Rental Los Angeles",
      pickupDateTime: "06/06/2024 5:00pm",
      dropOffDateTime: "06/10/2024 5:00pm",
      vehicleType: "Mid Size Car",
      additionalDrivers: "0",
      underageDriver: "No",
      internationalDriver: "No",
      additionalRequests: "No",
      lastFourCardNumber: "9500",
    };

    const adminEmailContent: IAdminMailInfo = {
      confirmationNumber: "ECR000001",
      name: "John Doe",
      phoneNumber: "123-456-7890",
      email: "johndoe@example.com",
      location: "Eagle Car Rental Los Angeles",
      pickupDateTime: "06/06/2024 5:00pm",
      dropOffDateTime: "06/10/2024 5:00pm",
      rateQuoted: "316",
      vehicleType: "Mid Size Car",
      additionalDrivers: "0",
      underageDriver: "No",
      internationalDriver: "No",
      additionalRequests: "No",
      lastFourCardNumber: "9500",
    };

    // Send email to client
    sendMail({
      //alihaiderizvi.you@gmail.com
      to: "alihaiderizvi.you@gmail.com",
      subject,
      html: customerCarBookingTemplate(customerEmailContent),
    });

    // Send email to admin
    sendMail({
      //   to: process.env.CLIENT_EMAIL as string,
      to: "alihaiderizvi.you@gmail.com",
      subject,
      html: adminCarBookingTemplate(adminEmailContent),
    });

    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    throw new Error("Failed to process payment and send emails");
  }
};
