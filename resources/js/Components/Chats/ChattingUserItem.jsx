import { setSelectedUser } from "@/store/slices/ChatSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChattingUserItem({ chatUser }) {
    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const chats = useSelector((state) => state.chat.chats);

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

    return (
        <div
            onClick={() => dispatch(setSelectedUser(chatUser))}
            className={
                (isSelected() ? "active" : "") +
                " flex justify-between relative"
            }
        >
            <div className="flex items-center gap-2">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={chatUser.image} />
                    </div>
                </div>
                <div>{chatUser.name}</div>
            </div>

            <div
                className={
                    "text-clip text-xs self-end " +
                    (isSelected() ? "text-white" : "text-slate-400")
                }
            >
                {new Date(lastMessageTime).toLocaleString()}
            </div>

            <div className="tooltip absolute top-2 right-2" data-tip="Online">
                <div className="badge badge-sm bg-green-400 border-green-400"></div>
            </div>
        </div>
    );
}
