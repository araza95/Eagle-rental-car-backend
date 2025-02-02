import { ADMIN_EMAIL_INTERFACE } from "../types/admin-email.interface";

/**
 *
 * @param param0
 * @param param0.confirmationNumber - Confirmation number for the booking
 * @param param0.name - Name of the person booking the car
 * @param param0.phoneNumber - Phone number of the person booking the car
 * @param param0.email - Email of the person booking the car
 * @param param0.location - Location where the car will be picked up
 * @param param0.pickupDateTime - Date and time the car will be picked up
 * @param param0.dropOffDateTime - Date and time the car will be dropped off
 * @param param0.rateQuoted - Rate quoted for the car
 * @param param0.vehicleType - Type of vehicle booked
 * @param param0.additionalDrivers - Additional drivers for the car
 * @param param0.underageDriver - If the driver is underage
 * @param param0.internationalDriver - If the driver is international
 * @param param0.additionalRequests - Additional requests for the car
 * @param param0.lastFourCardNumber - Last four digits of the card used for deposit
 *
 * @returns HTML template for the admin email
 *
 * @example
 * adminCarBookingTemplate({
 *  confirmationNumber: "123456",
 *  name: "John Doe",
 *  phoneNumber: "123-456-7890",
 *  email: "",
 *  location: "New York",
 *  pickupDateTime: "2024-01-01 12:00 PM",
 *  dropOffDateTime: "2024-01-05 12:00 PM",
 *  rateQuoted: "500",
 *  vehicleType: "SUV",
 *  additionalDrivers: "2",
 *  underageDriver: "No",
 *  internationalDriver: "No",
 *  additionalRequests: "None",
 *  lastFourCardNumber: "1234",
 */
export const adminCarBookingTemplate = ({
  confirmationNumber,
  name,
  phoneNumber,
  email,
  location,
  pickupDateTime,
  dropOffDateTime,
  rateQuoted,
  vehicleType,
  additionalDrivers,
  underageDriver,
  internationalDriver,
  additionalComments,
  lastFourCardNumber,
  idCard,
  driverLicensePicture,
}: ADMIN_EMAIL_INTERFACE): string => {
  return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Car Reservation</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  line-height: 1.6;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  text-align: center;
                  color: #333;
              }
              .info {
                  margin-bottom: 20px;
              }
              .info p {
                  margin: 10px 0;
              }
              .bold {
                  font-weight: bold;
              }
              .footer {
                  text-align: center;
                  font-size: 12px;
                  color: #777;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>New Reservation!</h1>
              <div class="info">
                  <p><span class="bold">Confirmation Number:</span> ${confirmationNumber}</p>
                  <p><span class="bold">Name:</span> ${name}</p>
                  <p><span class="bold">Phone Number:</span> ${phoneNumber}</p>
                  <p><span class="bold">Email:</span> ${email}</p>
              </div>
              <div class="info">
                  <p><span class="bold">Location:</span> ${location}</p>
                  <p><span class="bold">Pick up Date & Time:</span> ${pickupDateTime}</p>
                  <p><span class="bold">Drop off Date & Time:</span> ${dropOffDateTime}</p>
              </div>
              <div class="info">
                  <p><span class="bold">Rate Quoted:</span> $${rateQuoted}</p>
                  <p><span class="bold">Vehicle type:</span> ${vehicleType}</p>
              </div>
              <div class="info">
                  <p><span class="bold">Additional Drivers:</span> ${additionalDrivers}</p>
                  <p><span class="bold">Underage Driver:</span> ${underageDriver}</p>
                  <p><span class="bold">International Driver:</span> ${internationalDriver}</p>
                  <p><span class="bold">Additional Requests comments or requests:</span> ${additionalComments}</p>
              </div>
              <div class="info">
                  <p><span class="bold">Last four # of card used for deposit:</span> #${lastFourCardNumber}</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Eagle Car Rental. All rights reserved.</p>
              </div>

              <p style="margin-top: 20px;">The payment for the rental has been successfully processed.</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

        <h3 style="margin-top: 20px; margin-bottom: 10px; color: #007bff;">Driver's License & ID Card</h3>
        <p style="margin-bottom: 20px;">Please find below the links to your driver's license and ID card:</p>
        <ul>
            <img src="${driverLicensePicture}" width="200" alt="driver license">
            <br>
            <img src="${idCard}" width="200" alt="id card">
        </ul>
          </div>
      </body>
      </html>`;
};
