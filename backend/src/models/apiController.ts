import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import qs from "qs";

const apiController: AxiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const generateToken = async (): Promise<string> => {
  const {
    data: { access_token },
  } = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.CLIENT_ID!,
        password: process.env.CLIENT_SECRET!,
      },
    }
  );

  return access_token;
};

const handleReq = async (config: AxiosRequestConfig) => {
  const token = await generateToken();
  //@ts-ignore
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};
const handleResp = ({ data }: AxiosResponse) => data;
const handleErr = (error: any) => Promise.reject(error);

apiController.interceptors.response.use(handleResp, handleErr);
apiController.interceptors.request.use(handleReq, handleErr);

export { apiController };
