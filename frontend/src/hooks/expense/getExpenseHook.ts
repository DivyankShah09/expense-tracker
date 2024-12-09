import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { getRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";
import { dateFormat } from "../../utils/date-util";
import { Expense, ExpenseByMonthCategory } from "../../interfaces/Expense";

export const formatExpenseData = (data: any[]) => {
  return data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Format the date
    category: item.category
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char: any) => char.toUpperCase()), // Capitalize each word
  }));
};

const callGetExpenseById = async (id: string | undefined) => {
  try {
    const response = await getRequest<ApiSuccessResponse<Expense>>(
      ApiEndpoints.GET_EXPENSE + "/" + id
    );
    const formattedData = {
      ...response.data.data,
      date: dateFormat(new Date(response.data.data.date)), // Format the date
      category: response.data.data.category
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char: any) => char.toUpperCase()), // Capitalize each word
    };

    return { ...response, data: formattedData };
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

const callGetExpenseByUserIdApi = async (userId: string) => {
  try {
    const response = await getRequest<ApiSuccessResponse<Expense[]>>(
      ApiEndpoints.GET_EXPENSE_USER + "/" + userId
    );

    const formattedData = formatExpenseData(response.data.data);

    return { ...response, data: formattedData };
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

const callGetExpenseByYearAndUserIdApi = async (
  userId: string,
  year: string
) => {
  try {
    const response = await getRequest<ApiSuccessResponse<Expense[]>>(
      ApiEndpoints.GET_EXPENSE_USER + "/" + userId + "/" + year
    );

    const formattedData = formatExpenseData(response.data.data);

    return { ...response, data: formattedData };
  } catch (error) {
    console.log(error);
  }
};

const callGetExpenseByMonthCategoryApi = async (
  userId: string,
  year: string,
  startDate?: string,
  endDate?: string
) => {
  try {
    // Get the current year and today's date
    const currentYear = new Date().getFullYear();
    const today = new Date();

    // Set the default start date to the 1st January of the current year
    if (!startDate) {
      startDate = `${currentYear}-01-01`;
    }

    // Set the default end date to today's date if not provided
    if (!endDate) {
      endDate = today.toISOString().split("T")[0]; // Convert today to YYYY-MM-DD format
    }

    const start = startDate ? new Date(startDate).getTime() : null; // Start date as timestamp
    const end = endDate
      ? new Date(new Date(endDate).setHours(23, 59, 59, 999) + 1).getTime() // End date set to the end of the day
      : null;

    if (start && end && start >= end) {
      startDate = `${currentYear}-01-01`; // Reset to 1st January if the start date is greater than the end date
      endDate = today.toISOString().split("T")[0]; // Reset to today's date
    }

    const response = await getRequest<
      ApiSuccessResponse<ExpenseByMonthCategory[]>
    >(
      ApiEndpoints.GET_EXPENSE_BY_MONTH_CATEGORY +
        "/" +
        userId +
        "/" +
        year +
        "/" +
        startDate +
        "/" +
        endDate
    );

    return response.data;
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useGetExpenseById = (id: string | undefined, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetExpenseById(id),
    queryKey: [ReactQueryNames.GET_EXPENSE],
    enabled: enabled,
  });
};

export const useGetExpenseByUserId = (userId: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetExpenseByUserIdApi(userId),
    queryKey: [ReactQueryNames.GET_EXPENSE_BY_USERID],
    enabled: enabled,
  });
};

export const useGetExpenseByYearAndUserId = (
  userId: string,
  year: string,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetExpenseByYearAndUserIdApi(userId, year),
    queryKey: [ReactQueryNames.GET_EXPENSE_BY_YEAR],
    enabled: enabled,
  });
};

export const useGetExpenseByMonthCategory = (
  userId: string,
  year: string,
  enabled: boolean,
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryFn: () =>
      callGetExpenseByMonthCategoryApi(userId, year, startDate, endDate),
    queryKey: [
      ReactQueryNames.GET_EXPENSE_BY_MONTH_CATEGORY,
      startDate,
      endDate,
    ],
    enabled: enabled,
  });
};
