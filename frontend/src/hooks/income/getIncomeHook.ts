import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../model/api-success-response";
import { ApiEndpoints } from "../../utils/api-endpoints";
import { getRequest } from "../../utils/axios";
import { ReactQueryNames } from "../../utils/react-query-names";
import { dateFormat } from "../../utils/date-util";
import { Income } from "../../interfaces/Income";

export const formatIncomeData = (data: any[]) => {
  return data?.map((item) => ({
    ...item,
    date: dateFormat(new Date(item.date)), // Format the date
  }));
};

const callGetIncomeByIdApi = async (id: string | undefined) => {
  try {
    const response = await getRequest<ApiSuccessResponse<Income>>(
      ApiEndpoints.GET_INCOME + "/" + id
    );

    const formattedData = {
      ...response.data.data,
      date: dateFormat(new Date(response.data.data.date)),
    };

    return { ...response, data: formattedData };
  } catch (error) {
    console.log("Income Api error: ", error);
  }
};

const callGetIncomeByUserIdApi = async (userId: string) => {
  const response = await getRequest<ApiSuccessResponse<Income[]>>(
    ApiEndpoints.GET_INCOME_USER + "/" + userId
  );

  const formattedData = formatIncomeData(response.data.data);

  return { ...response, data: formattedData };
};

const callGetIncomeByYearAndByUserIdApi = async (
  userId: string,
  year: string
) => {
  const response = await getRequest<ApiSuccessResponse<Income[]>>(
    ApiEndpoints.GET_INCOME_USER + "/" + userId + "/" + year
  );

  const formattedData = formatIncomeData(response.data.data);

  return { ...response, data: formattedData };
};

export const useGetIncomeById = (id: string | undefined, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetIncomeByIdApi(id),
    queryKey: [ReactQueryNames.GET_INCOME],
    enabled: enabled,
  });
};

export const useGetIncomeByUserId = (userId: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetIncomeByUserIdApi(userId),
    queryKey: [ReactQueryNames.GET_INCOME_BY_USERID],
    enabled: enabled,
  });
};

export const useGetIncomeByYearAndUserId = (
  userId: string,
  year: string,
  enabled: boolean
) => {
  return useQuery({
    queryFn: () => callGetIncomeByYearAndByUserIdApi(userId, year),
    queryKey: [ReactQueryNames.GET_INCOME_BY_YEAR],
    enabled: enabled,
  });
};
