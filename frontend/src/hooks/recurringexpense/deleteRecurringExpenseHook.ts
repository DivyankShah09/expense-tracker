import { useMutation } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { deleteRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";

interface DeleteRecurringExpenseResponse {
  noOfDeletedExpense: number;
}

const callDeleteRecurringExpenseById = async (id: string | undefined) => {
  try {
    const response = await deleteRequest<
      ApiSuccessResponse<DeleteRecurringExpenseResponse>
    >(ApiEndpoints.GET_RECURRING_EXPENSE + "/" + id);
    return response;
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useDeleteRecurringExpense = () => {
  return useMutation({
    mutationFn: callDeleteRecurringExpenseById,
    mutationKey: [ReactQueryNames.GET_RECURRING_EXPENSE],
  });
};
