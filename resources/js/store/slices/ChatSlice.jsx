import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUser: null,
    contacts: [],
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
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
        setChattingUsers: (state, action) => {
            state.chattingUsers = action.payload;
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setUserStatus: (state, action) => {
            let found = false;
            state.chattingUsers = state.chattingUsers.map((user) => {
                if (user.id == action.payload.id) {
                    found = true;
                    return { ...user, online: action.payload.isOnline };
                }
                return user;
            });

            if (!found)
                state.contacts = state.contacts.map((user) => {
                    if (user.id == action.payload.id) {
                        return { ...user, online: action.payload.isOnline };
                    }
                    return user;
                });
        },
        addNewChat: (state, action) => {
            state.chats = { ...state.chats, [action.payload.id]: [] };
            state.chattingUsers = [...state.chattingUsers, action.payload];
            state.contacts = state.contacts.filter(
                (c) => c.id != action.payload.id
            );
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

                if (!state.chattingUsers.some((cu) => cu.id == newMessage.from))
                    state.chattingUsers = [
                        ...state.chattingUsers,
                        newMessage.from,
                    ];

                state.contacts = state.contacts.filter(
                    (c) => c.id != newMessage.from
                );
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

                if (!state.chattingUsers.some((cu) => cu.id == newMessage.to))
                    state.chattingUsers = [
                        ...state.chattingUsers,
                        newMessage.to,
                    ];

                state.contacts = state.contacts.filter(
                    (c) => c.id != newMessage.to
                );
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
    setContacts,
    setChats,
    addNewChat,
    addNewReceivedMessage,
    addNewCreatedMessage,
    setChatAsRead,
    setUserStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
