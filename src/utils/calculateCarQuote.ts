export const CalculateCarQuote = ({
  pickupDateTime,
  dropOffDateTime,
  dayCharges,
}: {
  pickupDateTime: Date;
  dropOffDateTime: Date;
  dayCharges: string;
}): number => {
  const parsedDayPrice = dayCharges.slice(1);

  if (pickupDateTime.getDate() === dropOffDateTime.getDate()) {
    return Math.ceil(Number(parsedDayPrice) * 1);
  }
  // calculate the difference in milliseconds
  const timeDifference = dropOffDateTime.getTime() - pickupDateTime.getTime();

  // Convert milliseconds to days
  const no_of_days = Number(Math.ceil(timeDifference / (1000 * 3600 * 24)));

  const quotation = Math.ceil(Number(parsedDayPrice)) * Number(no_of_days);

  return quotation;
};
