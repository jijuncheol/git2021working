import axios from "axios";

export interface ContactItemResponse {
  createdTime: number;
  id: number;
  name: string;
  phone: string;
  email: string;
  memo: string;
}

export interface ContactItemRequest {
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  memo: string | undefined;
}

const contactApi = {
  fetch: () =>
    axios.get<ContactItemResponse[]>(`${process.env.REACT_APP_API_BASE}/contacts`),

  add: (contactItem: ContactItemRequest) =>
    axios.post<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts`,
      contactItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.REACT_APP_API_BASE}/contacts/${id}`),


  modify: (id: number, contactItem: ContactItemRequest) =>
    axios.put<ContactItemResponse>(
      `${process.env.REACT_APP_API_BASE}/contacts/${id}`,
      contactItem
    ),
};

export default contactApi;
