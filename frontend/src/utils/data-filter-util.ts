export const filterDataByDateRange = (
  data: any[] | undefined,
  start: number | null,
  end: number | null
) =>
  data?.filter((entry) => {
    const date = new Date(entry.date).getTime();
    return (!start || date >= start) && (!end || date <= end);
  });

export const aggregateDataByMonth = (
  data: Array<{ date: string; amount: number }>
) => {
  const monthlySum = new Array(12).fill(0);

  data.forEach((entry) => {
    const date = new Date(entry.date);
    const month = date.getMonth(); // 0-11 for Jan-Dec
    monthlySum[month] += entry.amount;
  });

  return monthlySum;
};

// Utility function to calculate the total sum of amounts from the data
export const calculateTotal = (data: Array<{ amount: number }>) => {
  return data?.reduce((total, entry) => total + entry.amount, 0);
};
