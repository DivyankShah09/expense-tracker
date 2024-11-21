import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../model/api-success-response";
import { ApiEndpoints } from "../utils/api-endpoints";
import { getRequest } from "../utils/axios";
import { ReactQueryNames } from "../utils/react-query-names";
import { dateFormat } from "../utils/date-util";

interface GetIncomeResponse {
  title: string;
  description: string;
  amount: number;
  date: string;
}

export const formatIncomeData = (data: any[]) => {
  return data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Format the date
  }));
};

const callGetIncomeApi = async (id: string) => {
  const response = await getRequest<ApiSuccessResponse<GetIncomeResponse[]>>(
    ApiEndpoints.GET_INCOME + "/" + id
  );

  const formattedData = formatIncomeData(response.data.data);

  return { ...response, data: formattedData };
};

const callGetIncomeByYearApi = async (id: string, year: string) => {
  const response = await getRequest<ApiSuccessResponse<GetIncomeResponse[]>>(
    ApiEndpoints.GET_INCOME + "/" + id + "/" + year
  );

  const formattedData = formatIncomeData(response.data.data);

  return { ...response, data: formattedData };
};

export const useGetIncome = (id: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetIncomeApi(id),
    queryKey: [ReactQueryNames.GET_INCOME],
    enabled: enabled,
  });
};

export const useGetIncomeByYear = (
  id: string,
  year: string,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetIncomeByYearApi(id, year),
    queryKey: [ReactQueryNames.GET_INCOME_BY_YEAR],
    enabled: enabled,
  });
};
