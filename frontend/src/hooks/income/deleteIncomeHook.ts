import { useMutation } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { deleteRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";

interface DeleteIncomeResponse {
  noOfDeletedIncome: number;
}

const callDeleteIncomeByIdApi = async (id: string | undefined) => {
  try {
    const response = await deleteRequest<
      ApiSuccessResponse<DeleteIncomeResponse>
    >(ApiEndpoints.GET_EXPENSE + "/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const useDeleteIncome = () => {
  return useMutation({
    mutationFn: callDeleteIncomeByIdApi,
    mutationKey: [ReactQueryNames.DELETE_INCOME],
  });
};
