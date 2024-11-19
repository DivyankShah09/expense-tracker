import { useQuery } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../../model/api-success-response";
import { ApiEndpoints } from "../../../utils/api-endpoints";
import { getRequest } from "../../../utils/axios";
import { ReactQueryNames } from "../../../utils/react-query-names";

interface GetExpenseByMonthCategoryResponse {
  year: number;
  month: number;
  categoryId: number;
  categoryName: string;
  amount: number;
}

const callGetExpenseByMonthCategoryApi = async (id: string) => {
  try {
    const response = await getRequest<
      ApiSuccessResponse<GetExpenseByMonthCategoryResponse[]>
    >(ApiEndpoints.GET_EXPENSE_BY_MONTH_CATEGORY);

    return response.data;
  } catch (error) {
    console.log("Expense Api error: ", error);
  }
};

export const useGetExpenseByMonthCategory = (id: string, enabled: boolean) => {
  return useQuery({
    queryFn: () => callGetExpenseByMonthCategoryApi(id),
    queryKey: [ReactQueryNames.GET_EXPENSE_BY_MONTH_CATEGORY],
    enabled: enabled,
  });
};
