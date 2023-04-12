import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    chattingUsers: [],
    chats: [],
    chatsUnread: {}, //Map with <user_id, unread_msgs_count>
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
        addNewReceivedMessage: (state, action) => {
            const newMessage = action.payload;

            if (state.chats[newMessage.from.id]) {
                state.chats[newMessage.from.id].push(newMessage);
            } else {
                state.chats = {
                    ...state.chats,
                    [newMessage.from.id]: [newMessage],
                };

                state.chattingUsers = [...state.chattingUsers, newMessage.from];
            }

            if (!state.chatsUnread[newMessage.from.id])
                state.chatsUnread[newMessage.from.id] = 1;
            else state.chatsUnread[newMessage.from.id] += 1;
        },
        addNewCreatedMessage: (state, action) => {
            const newMessage = action.payload;

            if (state.chats[newMessage.to.id]) {
                state.chats[newMessage.to.id].push({
                    ...newMessage,
                    from: newMessage.from.id,
                    to: newMessage.to.id,
                });
            } else {
                state.chats = {
                    ...state.chats,
                    [newMessage.to.id]: [
                        {
                            ...newMessage,
                            from: newMessage.from.id,
                            to: newMessage.to.id,
                        },
                    ],
                };

                state.chattingUsers = [...state.chattingUsers, newMessage.to];
            }
        },
        setChatAsRead: (state, action) => {
            delete state.chatsUnread[action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setSelectedUser,
    setChattingUsers,
    setChats,
    addNewReceivedMessage,
    addNewCreatedMessage,
    setChatAsRead,
} = chatSlice.actions;

export default chatSlice.reducer;
