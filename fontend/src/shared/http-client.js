import axios from "axios";
import { tokenStorage } from "./storage";

class HttpClient {
  constructor() {
    this._instance = axios.create({
      baseURL: "http://15.164.99.251/api",
    });

    this._instance.interceptors.request.use(
      (config) => {
        const token = tokenStorage.getToken();

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async request({ resourceIdentifier, requestMethod, query, data }) {
    const response = await this._axios.request({
      method: requestMethod,
      url: resourceIdentifier,
      ...(query && {
        params: query,
      }),
      ...(data && {
        data: data,
      }),
    });

    return {
      statusCode: response.status,

      data: response.data,
    };
  }
}

export const httpClient = new HttpClient();
