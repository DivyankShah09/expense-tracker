import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { getRequest } from "../../utils/axios";
import { dateFormat } from "../../utils/date-util";
import { ReactQueryNames } from "../../utils/react-query-names";
import { RecurringExpense } from "../../interfaces/RecurringExpense";

export const formatExpenseData = (data: any[]) => {
  return data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Format the date
    category: item.category
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char: any) => char.toUpperCase()), // Capitalize each word
  }));
};

const callGetRecurringExpenseByIdApi = async (id: string | undefined) => {
  try {
    const response = await getRequest<ApiSuccessResponse<RecurringExpense>>(
      ApiEndpoints.GET_RECURRING_EXPENSE + "/" + id
    );
    const formattedData = {
      ...response.data.data,
      date: dateFormat(new Date(response.data.data.date)), // Format the date
      category: response.data.data.category
        .replace(/_/g, " ") // Replace underscores with spaces
        .replace(/\b\w/g, (char: any) => char.toUpperCase()), // Capitalize each word
    };

    console.log("recurring expense hook: ", formattedData);

    return { ...response, data: formattedData };
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

const callGetRecurringExpenseByUserIdApi = async (userId: string) => {
  try {
    const response = await getRequest<ApiSuccessResponse<RecurringExpense[]>>(
      ApiEndpoints.GET_RECURRING_EXPENSE_USER + "/" + userId
    );

    const formattedData = formatExpenseData(response.data.data);

    console.log(response.data.data);

    return { ...response, data: formattedData };
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useGetRecurringExpenseByUserId = (
  userId: string,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetRecurringExpenseByUserIdApi(userId),
    queryKey: [ReactQueryNames.GET_RECURRING_EXPENSE_BY_USER_ID],
    enabled: enabled,
  });
};

export const useGetRecurringExpenseById = (
  id: string | undefined,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetRecurringExpenseByIdApi(id),
    queryKey: [ReactQueryNames.GET_RECURRING_EXPENSE],
    enabled: enabled,
  });
};
