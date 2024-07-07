interface CustomerMailInfo {
  fullName: string;
  confirmationNumber: string;
  location: string;
  pickupDateTime: string;
  dropOffDateTime: string;
  vehicleType: string;
  additionalDrivers: string;
  underageDriver: string;
  internationalDriver: string;
  additionalRequests: string;
  lastFourCardNumber: string;
}

/**
 *
 * @param param0
 * @param param0.fullName - Full name of the customer
 * @param param0.confirmationNumber - Confirmation number for the booking
 * @param param0.location - Location where the car will be picked up
 * @param param0.pickupDateTime - Date and time the car will be picked up
 * @param param0.dropOffDateTime - Date and time the car will be dropped off
 * @param param0.vehicleType - Type of vehicle booked
 * @param param0.additionalDrivers - Additional drivers for the car
 * @param param0.underageDriver - If the driver is underage
 * @param param0.internationalDriver - If the driver is international
 * @param param0.additionalRequests - Additional requests for the car
 * @param param0.lastFourCardNumber - Last four digits of the card used for deposit
 *
 * @returns HTML template for the customer email
 *
 * @example
 * customerCarBookingTemplate({
 *  fullName: "John Doe",
 *  confirmationNumber: "123456",
 *  location: "New York",
 *  pickupDateTime: "2024-01-01 12:00 PM",
 *  dropOffDateTime: "2024-01-05 12:00 PM",
 *  vehicleType: "SUV",
 *  additionalDrivers: "2",
 *  underageDriver: "No",
 *  internationalDriver: "No",
 *  additionalRequests: "None",
 *  lastFourCardNumber: "1234",
 * })
 */
export const customerCarBookingTemplate = ({
  fullName,
  confirmationNumber,
  location,
  pickupDateTime,
  dropOffDateTime,
  vehicleType,
  additionalDrivers,
  underageDriver,
  internationalDriver,
  additionalRequests,
  lastFourCardNumber,
}: CustomerMailInfo): string => {
  return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
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
                <h1>Congratulations, ${fullName}!</h1>
                <p>Your rental booking has been successfully received! Please have your confirmation number ready upon arrival.</p>
                <div class="info">
                    <p><span class="bold">Confirmation Number:</span> ${confirmationNumber}</p>
                    <p><span class="bold">Location:</span> ${location}</p>
                    <p><span class="bold">Pick up Date & Time:</span> ${pickupDateTime}</p>
                    <p><span class="bold">Drop off Date & Time:</span> ${dropOffDateTime}</p>
                </div>
                <div class="info">
                    <p><span class="bold">Vehicle type:</span> ${vehicleType}</p>
                    <p><span class="bold">Additional Drivers:</span> ${additionalDrivers}</p>
                    <p><span class="bold">Underage Driver:</span> ${underageDriver}</p>
                    <p><span class="bold">International Driver:</span> ${internationalDriver}</p>
                    <p><span class="bold">Additional Requests comments or requests:</span> ${additionalRequests}</p>
                    <p><span class="bold">Last four # of card used for deposit:</span> #${lastFourCardNumber}</p>
                </div>
                <p>Thank you for booking with Eagle Car Rental!</p>
                <div class="info">
                    <p><span class="bold">Address:</span> 1100 W Florence Ave, Suite #B, Inglewood, CA 90301</p>
                    <p><span class="bold">Phone Number:</span> Cell: (310) 294-6980 / Landline: (424) 331-50</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Eagle Car Rental. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
};
