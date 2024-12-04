import { useMutation } from "@tanstack/react-query";
import { ApiSuccessResponse } from "../../../../model/api-success-response";
import { ApiEndpoints } from "../../../../utils/api-endpoints";
import { postRequest } from "../../../../utils/axios";
import { ReactQueryNames } from "../../../../utils/react-query-names";

interface ForgotPasswordRequest {
  email: string;
  password: string;
}

interface ForgotPasswordResponse {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

const callForgotPasswordApi = async (request: ForgotPasswordRequest) => {
  const response = await postRequest<
    ApiSuccessResponse<ForgotPasswordResponse>
  >(ApiEndpoints.FORGOT_PASSWORD, request);

  return response.data;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: callForgotPasswordApi,
    mutationKey: [ReactQueryNames.FORGOT_PASSWORD],
  });
};
