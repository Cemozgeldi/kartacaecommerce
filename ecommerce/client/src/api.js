import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = ["http://localhost:4000"];
    const token = localStorage.getItem("access-token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const fetchMe = async () => {
  const { data } = await axios.get("http://localhost:4000/auth/me");
  return data;
};
export const fetchLogOut = async () => {
  const { data } = await axios.post("http://localhost:4000/auth/logout", {
    refresh_token: localStorage.getItem("refresh-token"),
  });
  return data;
};
export const postOrder = async (input) => {
  const { data } = await axios.post("http://localhost:4000/order", input);
  return data;
};
