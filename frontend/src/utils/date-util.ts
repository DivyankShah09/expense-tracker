export const dateFormat = (date: Date): string => {
  const d = new Date(date); // Ensure it's a Date object
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return `${month}-${day}-${year}`;
};
