export interface ADMIN_EMAIL_INTERFACE {
  confirmationNumber: string;
  phone: string;
  name: string;
  phoneNumber: string;
  email: string;
  location: string;
  pickupDateTime: Date;
  dropOffDateTime: Date;
  rateQuoted: number;
  vehicleType: string;
  additionalDrivers: number;
  underageDriver: string;
  internationalDriver: string;
  additionalComments: string;
  lastFourCardNumber: string;
  idCard: string;
  driverLicensePicture: string;
}
