import {
    addNewChat,
    setChatAsRead,
    setSelectedUser,
} from "@/store/slices/ChatSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserItem({ user, isContact }) {
    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const chats = useSelector((state) => state.chat.chats);
    const chatsUnread = useSelector((state) => state.chat.chatsUnread);

    const dispatch = useDispatch();

    const [lastMessageTime, setLastMessageTime] = useState();

    useEffect(() => {
        if (!chats | isContact) return;

        const lastMessage = chats[user.id][chats[user.id].length - 1];
        if (lastMessage) setLastMessageTime(lastMessage.created_at);
    }, [chats]);

    function isSelected() {
        return user.id == selectedUser?.id;
    }

    function unreadMessages() {
        return chatsUnread[user.id] ? chatsUnread[user.id] : 0;
    }

    function onUserSelected() {
        if (isContact) {
            dispatch(addNewChat(user));
            dispatch(setSelectedUser(user));
        } else {
            dispatch(setSelectedUser(user));
            dispatch(setChatAsRead(user.id));
        }
    }

    return (
        <div
            onClick={onUserSelected}
            className={
                (isSelected() ? "active" : "") +
                " flex justify-between relative"
            }
        >
            <div className="flex items-center gap-4">
                <div className="indicator">
                    <span
                        className={
                            "indicator-item badge" +
                            (user.online
                                ? " badge-success border-success-400"
                                : " badge-ghost border-black")
                        }
                    ></span>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={user.image} />
                        </div>
                    </div>
                </div>

                <div>{user.name}</div>
            </div>

            {!isContact && (
                <div className="flex flex-col justify-around gap-4 items-end">
                    {unreadMessages() > 0 && (
                        <span
                            className={
                                "badge" +
                                (!isSelected() ? " animate-bounce" : "")
                            }
                        >
                            {unreadMessages()}
                        </span>
                    )}
                    {lastMessageTime && (
                        <div
                            className={
                                "text-clip text-xs self-end text-end " +
                                (isSelected() ? "text-white" : "text-slate-400")
                            }
                        >
                            {new Date(lastMessageTime).toLocaleString()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
