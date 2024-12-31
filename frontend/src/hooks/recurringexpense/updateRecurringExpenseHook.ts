import { useMutation } from "@tanstack/react-query";
import { RecurringExpense } from "../../interfaces/RecurringExpense";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { putRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";

interface UpdateRecurringExpenseResponse {
  noOfUpdatedExpense: number;
}

const callUpdateRecurringExpenseById = async (request: RecurringExpense) => {
  const response = await putRequest<
    ApiSuccessResponse<UpdateRecurringExpenseResponse>
  >(ApiEndpoints.UPDATE_RECURRING_EXPENSE, request);
  return response.data;
};

export const useUpdateExpenseById = () => {
  return useMutation({
    mutationFn: callUpdateRecurringExpenseById,
    mutationKey: [ReactQueryNames.UPDATE_RECURRING_EXPENSE],
  });
};
