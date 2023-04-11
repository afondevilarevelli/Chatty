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
        addNewMessage: (state, action) => {
            const newMessage = action.payload;

            if (state.chats[newMessage.from.id]) {
                console.log("HAS KEY");
                state.chats[newMessage.from.id].push(newMessage);
            } else {
                console.log("CREATING");
                state.chats = {
                    ...state.chats,
                    [newMessage.from.id]: [newMessage],
                };

                state.chattingUsers = [...state.chattingUsers, newMessage.from];
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSelectedUser, setChattingUsers, setChats, addNewMessage } =
    chatSlice.actions;

export default chatSlice.reducer;
