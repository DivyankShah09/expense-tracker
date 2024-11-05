import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
} from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.timeout = 60000;

// intercept the request and add authorization header
axios.interceptors.request.use(
  (request) => {
    try {
      const jwtToken = localStorage.getItem("token");
      if (jwtToken != null) {
        request.headers.Authorization = "Bearer " + jwtToken;
      }
      return request;
    } catch (e) {
      return request;
    }
  },
  async (err) => {
    return Promise.reject(err);
  }
);

// Get Request
export function getRequest<T>(
  endPoint: string,
  parameters: unknown = "",
  url = "",
  header: HeadersDefaults & Record<string, AxiosHeaderValue> = axios.defaults
    .headers
) {
  if (url !== "") {
    axios.defaults.baseURL = url;
  }
  axios.defaults.headers = {
    ...header,
  };

  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .get(endPoint, { params: parameters ?? "" })
      .then(function (response: AxiosResponse<T>) {
        resolve(response);
      })
      .catch(function (error: AxiosError) {
        reject(error);
      });
  });
}

// Post Request
export function postRequest<T>(
  endPoint: string,
  parameters: unknown = {},
  header: HeadersDefaults & Record<string, AxiosHeaderValue> = axios.defaults
    .headers,
  requestConfig: AxiosRequestConfig | undefined = undefined
) {
  axios.defaults.headers = {
    ...header,
  };

  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .post(endPoint, parameters, requestConfig)
      .then((response: AxiosResponse<T>) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
}

// Put Request
export function putRequest<T>(
  endPoint: string,
  parameters: unknown = {},
  header: HeadersDefaults & Record<string, AxiosHeaderValue> = axios.defaults
    .headers,
  requestConfig: AxiosRequestConfig | undefined = undefined
) {
  // set this to token returned by server after user logs in
  axios.defaults.headers = {
    ...header,
  };

  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .put(endPoint, parameters, requestConfig)
      .then((response: AxiosResponse<T>) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        reject(error);
      });
  });
}

// Delete Request
export function deleteRequest<T>(
  endPoint: string,
  parameters: unknown = "",
  url = "",
  header: HeadersDefaults & Record<string, AxiosHeaderValue> = axios.defaults
    .headers
) {
  if (url !== "") {
    axios.defaults.baseURL = url;
  }
  axios.defaults.headers = {
    ...header,
  };

  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .delete(endPoint, {
        params: parameters ?? "",
      })
      .then(function (response: AxiosResponse<T>) {
        resolve(response);
      })
      .catch(function (error: AxiosError) {
        reject(error);
      });
  });
}
