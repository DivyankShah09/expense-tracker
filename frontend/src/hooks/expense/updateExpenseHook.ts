import { useMutation } from "@tanstack/react-query";
import { Expense } from "../../interfaces/Expense";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { putRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";

interface UpdateExpenseResponse {
  noOfUpdatedExpense: number;
}

const callUpdateExpenseByIdApi = async (request: Expense) => {
  const response = await putRequest<ApiSuccessResponse<UpdateExpenseResponse>>(
    ApiEndpoints.UPDATE_EXPENSE,
    request
  );
  return response.data;
};

export const useUpdateExpenseById = () => {
  return useMutation({
    mutationFn: callUpdateExpenseByIdApi,
    mutationKey: [ReactQueryNames.UPDATE_EXPENSE],
  });
};
