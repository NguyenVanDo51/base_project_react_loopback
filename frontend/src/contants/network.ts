import axios, {Method} from 'axios';

export const callApi = async (uri: string, method: Method = 'GET', data?: object) => {
  try {
      return await axios({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${uri}`,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  } catch (e) {
    return e;
  }
}
