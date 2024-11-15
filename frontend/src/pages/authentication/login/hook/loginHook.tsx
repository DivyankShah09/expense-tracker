import { useMutation } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../../../model/api-success-response";
import { ApiEndpoints } from "../../../../utils/api-endpoints";
import { postRequest } from "../../../../utils/axios";
import { ReactQueryNames } from "../../../../utils/react-query-names";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

const callLoginApi = async (request: LoginRequest) => {
  const response = await postRequest<ApiSuccessResponse<LoginResponse>>(
    ApiEndpoints.LOGIN,
    request
  );

  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: callLoginApi,
    mutationKey: [ReactQueryNames.LOGIN],
  });
};
