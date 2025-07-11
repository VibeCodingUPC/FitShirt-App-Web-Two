import axios from "axios";

const useAxios = () => {
  const baseUrl = `https://fitshirt.azurewebsites.net/api/v1`;
  const jwtHeader = {
    'Authorization' :'Bearer ' +  sessionStorage.getItem('jwt')
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: jwtHeader
  })

  return axiosInstance;
}

export default useAxios;