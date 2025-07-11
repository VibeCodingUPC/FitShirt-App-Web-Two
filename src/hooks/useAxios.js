import axios from "axios";

const useAxios = () => {
  const baseUrl = `https://fitshirt.azurewebsites.net/api/v1`;

  const axiosInstance = axios.create({
    baseURL: baseUrl
  })

  return axiosInstance;
}

export default useAxios;