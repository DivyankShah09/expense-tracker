import { useMutation } from "@tanstack/react-query";
import { postRequest } from "../../../../utils/axios";
import { ApiSuccessResponse } from "../../../../model/api-success-response";
import { ApiEndpoints } from "../../../../utils/api-endpoints";
import { ReactQueryNames } from "../../../../utils/react-query-names";

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: number;
}

interface SignUpResponse {
  name: string;
  email: string;
  access_token: string;
}

const callSignUpApi = async (request: SignUpRequest) => {
  const response = await postRequest<ApiSuccessResponse<SignUpResponse>>(
    ApiEndpoints.SIGNUP,
    request
  );

  return response.data;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: callSignUpApi,
    mutationKey: [ReactQueryNames.SIGNUP],
  });
};
