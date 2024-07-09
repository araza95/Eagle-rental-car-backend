export interface CUSTOMER_EMAIL_INTERFACE {
  confirmationNumber: string;
  phoneNumber: string;
  email: string;
  fullName: string;
  location: string;
  pickupDateTime: Date;
  dropOffDateTime: Date;
  vehicleType: string;
  additionalDrivers: number;
  underageDriver: string;
  internationalDriver: string;
  additionalRequests: string;
  lastFourCardNumber: string;
  rateQuoted: number;
  vehiclePicture: string;
}
