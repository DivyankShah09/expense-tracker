import { useMutation } from "@tanstack/react-query";
import { ApiEndpoints } from "../../../utils/api-endpoints";
import { postRequest } from "../../../utils/axios";
import { ReactQueryNames } from "../../../utils/react-query-names";
import { ApiSuccessResponse } from "../../../model/api-success-response";

interface AddIncomeRequest {
  title: string;
  description: string;
  amount: number;
  date: string;
}

interface AddIncomeResponse {
  id: number;
  title: string;
  description: string;
  amount: number;
  date: Date;
}

const callAddIncomeApi = async (request: AddIncomeRequest) => {
  const response = await postRequest<ApiSuccessResponse<AddIncomeResponse>>(
    ApiEndpoints.ADD_INCOME,
    request
  );
  return response.data;
};

export const useAddIncome = () => {
  return useMutation({
    mutationFn: callAddIncomeApi,
    mutationKey: [ReactQueryNames.ADD_INCOME],
  });
};
