import { Income } from "../../interfaces/Income";
import { putRequest } from "../../utils/axios";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { useMutation } from "@tanstack/react-query";
import { ReactQueryNames } from "../../utils/react-query-names";

interface UpdateIncomeResponse {
  noOfUpdateIncome: number;
}

const callUpdateIncomeByIdApi = async (request: Income) => {
  const response = await putRequest<ApiSuccessResponse<UpdateIncomeResponse>>(
    ApiEndpoints.UPDATE_INCOME,
    request
  );

  return response.data;
};

export const useUpdateIncomeById = () => {
  return useMutation({
    mutationFn: callUpdateIncomeByIdApi,
    mutationKey: [ReactQueryNames.UPDATE_INCOME],
  });
};
