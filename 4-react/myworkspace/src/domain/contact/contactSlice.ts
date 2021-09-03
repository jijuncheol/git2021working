import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  description?: string;
  createdTime: number;
}

interface ContactState {
  data: ContactItem[];
  isFetched: boolean;
}

const initialState: ContactState = {
  data: [
    {
      id: 1,
      name: "JunCheol Jl",
      phone: "010-3137-0322",
      email: "flix1242@naver.com",
      description: "지준철 연락처",
      createdTime: new Date().getTime(),
    },
  ],
  isFetched: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      console.log("--in reducer function--");
      console.log(contact);
      state.data.unshift(contact);
    },
  },
});

export const { addContact } = contactSlice.actions;

export default contactSlice.reducer;