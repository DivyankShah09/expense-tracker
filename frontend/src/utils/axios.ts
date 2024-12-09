import axios, {
  AxiosError,
  AxiosHeaderValue,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
} from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.timeout = 60000;

// Intercept the request and add authorization header
axios.interceptors.request.use(
  (request) => {
    try {
      const jwtToken = localStorage.getItem("token");
      if (jwtToken != null) {
        request.headers.Authorization = "Bearer " + jwtToken;
      }
      return request;
    } catch (e) {
      console.error("Request Interception Error: ", e);
      return request;
    }
  },
  (error) => {
    console.error("Request Error: ", error);
    return Promise.reject(error);
  }
);

// Intercept responses to log errors globally and handle 401
axios.interceptors.response.use(
  (response) => {
    return response; // If the response is successful, return it as-is
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      console.error("API Error:", {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });

      // Redirect to login if unauthorized
      if (status === 401) {
        console.warn("Unauthorized access. Redirecting to login...");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login";
      }
    } else if (error.request) {
      console.error("No Response Received: ", error.request);
    } else {
      console.error("Unexpected Error: ", error.message);
    }
    return Promise.reject(error); // Re-throw the error for specific handling if needed
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
      .then((response: AxiosResponse<T>) => resolve(response))
      .catch((error: AxiosError) => reject(error));
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
      .then((response: AxiosResponse<T>) => resolve(response))
      .catch((error: AxiosError) => reject(error));
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
  axios.defaults.headers = {
    ...header,
  };

  return new Promise<AxiosResponse<T>>((resolve, reject) => {
    axios
      .put(endPoint, parameters, requestConfig)
      .then((response: AxiosResponse<T>) => resolve(response))
      .catch((error: AxiosError) => reject(error));
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
      .delete(endPoint, { params: parameters ?? "" })
      .then((response: AxiosResponse<T>) => resolve(response))
      .catch((error: AxiosError) => reject(error));
  });
}
