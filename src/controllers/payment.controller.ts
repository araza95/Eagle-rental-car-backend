// Controller
import { Request, Response } from "express";
import { processPayment } from "../services/payment.service";
import { CUSTOMER_EMAIL_INTERFACE } from "../types/customer-email.interface";
import { ADMIN_EMAIL_INTERFACE } from "../types/admin-email.interface";
import { generateConfirmationCode } from "../utils/generateConfirmationCode";

export const handlePayment = async (req: Request, res: Response) => {
  console.log("🚀 ~ handlePayment ~ req.body:", req.body);
  const { paymentMethod, last4, finalPayload } = req.body;

  const {
    personalInfo,
    duration,
    email,
    ageDetail,
    vehicle,
    addtional,
    driverLicensePicture,
    phone,
    additionalComment,
  } = finalPayload;

  const { firstName, lastName, address } = personalInfo;

  const { pickupDate, pickupTime, dropoffDate, dropoffTime } = duration;

  const { dayCharges, description } = vehicle;

  const { count } = addtional;

  const { idCard } = ageDetail;

  const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);

  const dropOffDateTime = new Date(`${dropoffDate}T${dropoffTime}`);

  // Calculate the difference in milliseconds
  const timeDifference = dropOffDateTime.getTime() - pickupDateTime.getTime();

  // Convert milliseconds to days
  const no_of_days = Number(Math.ceil(timeDifference / (1000 * 3600 * 24)));

  console.log("🚀 ~ handlePayment ~ no_of_days:", no_of_days);

  // BAD Approach: I am doing this because the FRONTEND is not sending the correct data.
  const parsedDayPrice = dayCharges.slice(1);

  const rate_quote = Math.ceil(Number(parsedDayPrice)) * Number(no_of_days);

  const confirmationCode: string = generateConfirmationCode();

  const customerEmailContent: CUSTOMER_EMAIL_INTERFACE = {
    confirmationNumber: confirmationCode,
    fullName: `${firstName} ${lastName}`,
    phoneNumber: phone,
    email: email,
    location: address,
    pickupDateTime: pickupDateTime,
    dropOffDateTime: dropOffDateTime,
    vehicleType: description,
    additionalDrivers: count,
    underageDriver: idCard ? "Yes" : "No",
    internationalDriver: "No",
    additionalRequests: "No",
    rateQuoted: rate_quote,
    lastFourCardNumber: last4,
  };

  const adminEmailContent: ADMIN_EMAIL_INTERFACE = {
    confirmationNumber: confirmationCode,
    phone: phone,
    name: `${firstName} ${lastName}`,
    phoneNumber: phone,
    email: email,
    location: address,
    pickupDateTime: pickupDateTime,
    dropOffDateTime: dropOffDateTime,
    rateQuoted: rate_quote,
    vehicleType: description,
    additionalDrivers: count,
    underageDriver: idCard ? "Yes" : "No",
    internationalDriver: "No",
    additionalComments: additionalComment,
    lastFourCardNumber: last4,
  };

  try {
    const result = await processPayment({
      customerEmailContent,
      adminEmailContent,
      paymentMethod,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
