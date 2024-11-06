import { useMutation } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../../model/api-success-response";
import { ApiEndpoints } from "../../../utils/api-endpoints";
import { postRequest } from "../../../utils/axios";
import { ReactQueryNames } from "../../../utils/react-query-names";
interface addExpenseRequest {
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface AddExpenseResponse {
  id: number;
}

const callAddExpenseApi = async (request: addExpenseRequest) => {
  const response = await postRequest<ApiSuccessResponse<AddExpenseResponse>>(
    ApiEndpoints.ADD_EXPENSE,
    request
  );
  return response.data;
};

export const useAddExpense = () => {
  return useMutation({
    mutationFn: callAddExpenseApi,
    mutationKey: [ReactQueryNames.ADD_EXPENSE],
  });
};
