import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactItem {
  id: number;
  name: string;
  phone: string;
  email: string;
  memo: string;
  createdTime: number;
}

interface ContactState {
  data: ContactItem[];
  isFetchted: boolean;
}

const initialState: ContactState = {
  data: [],
  isFetchted: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      state.data.unshift(contact);
    },
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
      const modifyItem = action.payload;
      const contactItem = state.data.find((item) => item.id === modifyItem.id);
      if (contactItem) {
        contactItem.name = modifyItem.name;
        contactItem.phone = modifyItem.phone;
        contactItem.email = modifyItem.email;
        contactItem.memo = modifyItem.memo;
      }
    },
    initialContact: (state, action: PayloadAction<ContactItem[]>) => {
      const contacts = action.payload;
      state.data = contacts;
      state.isFetchted = true;
    }
  },
});

export const { addContact, removeContact, modifyContact, initialContact } =
  contactSlice.actions;

export default contactSlice.reducer;