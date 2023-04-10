import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    chattingUsers: [],
    chats: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setChattingUsers: (state, action) => {
            state.chattingUsers = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser, setChattingUsers, setChats } =
    chatSlice.actions;

export default chatSlice.reducer;
