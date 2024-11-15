import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../../model/api-success-response";
import { ApiEndpoints } from "../../../utils/api-endpoints";
import { getRequest } from "../../../utils/axios";
import { ReactQueryNames } from "../../../utils/react-query-names";

interface GetIncomeResponse {
  title: string;
  description: string;
  amount: number;
  date: string;
}

const callGetIncomeApi = async (id: string) => {
  const response = await getRequest<ApiSuccessResponse<GetIncomeResponse[]>>(
    ApiEndpoints.GET_INCOME + "/" + id
  );

  return response.data;
};

export const useGetIncome = (id: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetIncomeApi(id),
    queryKey: [ReactQueryNames.GET_INCOME],
    enabled: enabled,
  });
};
