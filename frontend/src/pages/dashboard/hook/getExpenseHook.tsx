import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../../model/api-success-response";
import { ApiEndpoints } from "../../../utils/api-endpoints";
import { getRequest } from "../../../utils/axios";
import { ReactQueryNames } from "../../../utils/react-query-names";

interface GetExpenseResponse {
  title: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

const callGetExpenseApi = async (id: string) => {
  try {
    const response = await getRequest<ApiSuccessResponse<GetExpenseResponse[]>>(
      ApiEndpoints.GET_EXPENSE + "/" + id
    );

    return response.data;
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useGetExpense = (id: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetExpenseApi(id),
    queryKey: [ReactQueryNames.GET_EXPENSE],
    enabled: enabled,
  });
};
