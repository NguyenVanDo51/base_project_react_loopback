import axios, { Method } from 'axios';
import DataManager from './DataManager';

export const callApi = async (uri: string, method: Method = 'GET', data?: object, failed?: (res: any) => void ) => {
  try {
    return await axios({
      method: method,
      url: `${process.env.REACT_APP_API_URL}${uri}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('todoAppCccessToken'),
      },
    });
  } catch (e) {
    failed && failed(e);
    return e;
  }
}
