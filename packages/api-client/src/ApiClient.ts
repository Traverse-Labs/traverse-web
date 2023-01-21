import { CommonAmplitudeEvent, trackCommonEvent } from "analytics";
import axios, { AxiosError } from "axios";

const ApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-user-id": "2",
  },
});

ApiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers["x-request-start-time"] = new Date().getTime();
  }
  return config;
});

ApiClient.interceptors.response.use((response) => {
  if (response.config.headers) {
    const endTime = new Date().getTime();
    const startTime = response.config.headers["x-request-start-time"] as number;
    const duration = (endTime - startTime) / 1000;

    // Only send events if API >= 7s
    if (duration >= 7) {
      const { baseURL: baseUrl = "", url = "" } = response.config;

      trackCommonEvent(CommonAmplitudeEvent.ApiResponseTime, {
        baseUrl,
        url,
        duration,
      });
    }
  }
  return response;
});

ApiClient.interceptors.response.use((res) => res, interceptErrorResponse);

function interceptErrorResponse(error: AxiosError) {
  const { message: errorMessage, code: statusText = "" } = error;
  const {
    method = "",
    baseURL: baseUrl = "",
    url = "",
    params = {},
  } = error.config;
  const statusCode = error.response?.status as number;

  trackCommonEvent(CommonAmplitudeEvent.RequestError, {
    method,
    baseUrl,
    url,
    errorMessage,
    statusText,
    statusCode,
    params,
  });

  console.log("Network Error: ", error);
  throw error;
}

export default ApiClient;
