import api from './instance';

export async function getRequest(URL: string, params: object): Promise<any> {
  const response = await api.get(URL, {params: params});
  return response;
}
export async function postRequest(URL: string, params: object): Promise<any> {
  const response = await api.post(URL, params);
  return response;
}
export async function patchRequest(URL: string, payload: object): Promise<any> {
  const response = await api.patch(URL, payload);
  return response;
}
export async function putRequest(URL: string, payload: object): Promise<any> {
  const response = await api.put(URL, payload);
  return response;
}
export async function deleteRequest(URL: string): Promise<any> {
  const response = await api.delete(URL);
  return response;
}
