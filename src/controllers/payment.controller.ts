// Controller
import { Request, Response } from "express";
import { processPayment } from "../services/payment.service";
import { CUSTOMER_EMAIL_INTERFACE } from "../types/customer-email.interface";
import { ADMIN_EMAIL_INTERFACE } from "../types/admin-email.interface";
import { generateConfirmationCode } from "../utils/generateConfirmationCode";
import { CalculateCarQuote } from "../utils/calculateCarQuote";

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

  const { dayCharges, description, image } = vehicle;

  const { count } = addtional;

  const { idCard, age } = ageDetail;
  const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);

  const dropOffDateTime = new Date(`${dropoffDate}T${dropoffTime}`);

  const rate_quote = CalculateCarQuote({
    pickupDateTime,
    dropOffDateTime,
    dayCharges,
  });

  const confirmationCode: string = generateConfirmationCode();

  console.log("🚀 ~ handlePayment ~ rate_quote:", rate_quote);

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
    underageDriver: age === "25+" ? "No" : "Yes",
    internationalDriver: "No",
    additionalRequests: "No",
    rateQuoted: rate_quote,
    lastFourCardNumber: last4,
    vehiclePicture: image,
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
    idCard: idCard,
    driverLicensePicture: driverLicensePicture,
    vehiclePicture: image,
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
