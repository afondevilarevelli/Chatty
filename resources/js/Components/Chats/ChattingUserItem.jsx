import { setChatAsRead, setSelectedUser } from "@/store/slices/ChatSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChattingUserItem({ chatUser }) {
    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const chats = useSelector((state) => state.chat.chats);
    const chatsUnread = useSelector((state) => state.chat.chatsUnread);

    const dispatch = useDispatch();

    const [lastMessageTime, setLastMessageTime] = useState();

    useEffect(() => {
        if (!chats) return;

        setLastMessageTime(
            chats[chatUser.id][chats[chatUser.id].length - 1].created_at
        );
    }, [chats]);

    function isSelected() {
        return chatUser.id == selectedUser?.id;
    }

    function unreadMessages() {
        return chatsUnread[chatUser.id] ? chatsUnread[chatUser.id] : 0;
    }

    return (
        <div
            onClick={() => {
                dispatch(setSelectedUser(chatUser));
                dispatch(setChatAsRead(chatUser.id));
            }}
            className={
                (isSelected() ? "active" : "") +
                " flex justify-between relative"
            }
        >
            <div className="flex items-center gap-4">
                <div className="indicator">
                    <span className="indicator-item badge badge-success border-success-400"></span>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={chatUser.image} />
                        </div>
                    </div>
                </div>

                <div>{chatUser.name}</div>
            </div>

            <div className="flex flex-col justify-around gap-4 items-end">
                {unreadMessages() > 0 && (
                    <span className="badge">{unreadMessages()}</span>
                )}
                <div
                    className={
                        "text-clip text-xs self-end " +
                        (isSelected() ? "text-white" : "text-slate-400")
                    }
                >
                    {new Date(lastMessageTime).toLocaleString()}
                </div>
            </div>
        </div>
    );
}
