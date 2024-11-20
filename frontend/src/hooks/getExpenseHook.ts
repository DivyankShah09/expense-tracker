import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../model/api-success-response";
import { ApiEndpoints } from "../utils/api-endpoints";
import { getRequest } from "../utils/axios";
import { ReactQueryNames } from "../utils/react-query-names";
import { dateFormat } from "../utils/date-util";

interface Expense {
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpenseByMonthCategory {
  year: number;
  month: number;
  categoryName: string;
  amount: number;
}

export const formatExpenseData = (data: any[]) => {
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Format the date
    category: item.category
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char: any) => char.toUpperCase()), // Capitalize each word
  }));
};

const callGetExpenseApi = async (id: string) => {
  try {
    const response = await getRequest<ApiSuccessResponse<Expense[]>>(
      ApiEndpoints.GET_EXPENSE + "/" + id
    );

    const formattedData = formatExpenseData(response.data.data);

    return { ...response, data: formattedData };
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

const callGetExpenseByYearApi = async (id: string, year: string) => {
  try {
    const response = await getRequest<ApiSuccessResponse<Expense[]>>(
      ApiEndpoints.GET_EXPENSE + "/" + id + "/" + year
    );

    const formattedData = formatExpenseData(response.data.data);

    return { ...response, data: formattedData };
  } catch (error) {
    console.log(error);
  }
};

const callGetExpenseByMonthCategoryApi = async (id: string, year: string) => {
  try {
    const response = await getRequest<
      ApiSuccessResponse<ExpenseByMonthCategory[]>
    >(ApiEndpoints.GET_EXPENSE_BY_MONTH_CATEGORY + "/" + id + "/" + year);

    return response.data;
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useGetExpense = (id: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetExpenseApi(id),
    queryKey: [ReactQueryNames.GET_EXPENSE],
    enabled: enabled,
  });
};

export const useGetExpenseByYear = (
  id: string,
  year: string,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetExpenseByYearApi(id, year),
    queryKey: [ReactQueryNames.GET_EXPENSE_BY_YEAR],
    enabled: enabled,
  });
};

export const useGetExpenseByMonthCategory = (
  id: string,
  year: string,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetExpenseByMonthCategoryApi(id, year),
    queryKey: [ReactQueryNames.GET_EXPENSE_BY_MONTH_CATEGORY],
    enabled: enabled,
  });
};
