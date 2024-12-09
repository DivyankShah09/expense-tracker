import { useMutation } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { deleteRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";

interface DeleteExpenseResponse {
  noOfDeletedExpense: number;
}

const callDeleteExpenseByIdApi = async (id: string | undefined) => {
  try {
    const response = await deleteRequest<
      ApiSuccessResponse<DeleteExpenseResponse>
    >(ApiEndpoints.GET_EXPENSE + "/" + id);
    return response;
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useDeleteExpense = () => {
  return useMutation({
    mutationFn: callDeleteExpenseByIdApi,
    mutationKey: [ReactQueryNames.GET_EXPENSE],
  });
};
