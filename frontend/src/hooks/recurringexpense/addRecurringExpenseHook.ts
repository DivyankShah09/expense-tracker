import { useMutation } from "@tanstack/react-query";
import { ReactQueryNames } from "../../utils/react-query-names";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { postRequest } from "../../utils/axios";

interface AddRecurringExpenseRequest {
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  frequency: string;
}

const callAddRecurringExpenseApi = async (
  request: AddRecurringExpenseRequest
) => {
  const response = await postRequest<
    ApiSuccessResponse<AddRecurringExpenseRequest>
  >(ApiEndpoints.ADD_RECURRING_EXPENSE, request);
  return response.data;
};

export const useAddRecurringExpense = () => {
  return useMutation({
    mutationFn: callAddRecurringExpenseApi,
    mutationKey: [ReactQueryNames.ADD_RECURRING_EXPENSE],
  });
};
