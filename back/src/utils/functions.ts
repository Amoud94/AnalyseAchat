export const timePeriod = (payload: string) => {
  const endDate = new Date(); // Current date
  let startDate: Date;
  // Determine start date based on selected period
  switch (payload) {
    case "7days":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "30days":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);
      break;
    case "12months":
      startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      throw new Error("Invalid time period");
  }
  return { startDate, endDate };
};
