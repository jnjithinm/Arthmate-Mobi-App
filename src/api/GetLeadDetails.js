import axios from 'axios';
import { config } from '../../config';
import { genericFetch } from '../../utils';

export async function getLeadDetailsApi(token, id) {
  const requestOption = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params: {
      id: id,
    },
    url: config.GETLEADDETAILS_URL,
  };

  try {
    const apiResponse = await axios(requestOption);

    return genericFetch(apiResponse);
  } catch (error) {
    let obj = { data: { error: true, message: error } };
    return genericFetch(obj);
  }
}
