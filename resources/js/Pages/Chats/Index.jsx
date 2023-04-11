import ChatLayout from "@/Layouts/Chats/ChatLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    FaceSmileIcon,
    PaperClipIcon,
    PhotoIcon,
} from "@heroicons/react/24/solid";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setChattingUsers } from "@/store/slices/ChatSlice";
import { ChatService } from "@/services/ChatService";
import { addNewMessage } from "../../store/slices/ChatSlice";
import React from "react";

export default function Chat({ auth, chattingUsers, chats }) {
    console.log(chats, chattingUsers);

    const [inputMessage, setInputMessage] = useState("");

    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const allChats = useSelector((state) => state.chat.chats);
    const allChattingUsers = useSelector((state) => state.chat.chattingUsers);

    const dispatch = useDispatch();

    const messagesEndRef = React.createRef();

    useEffect(() => {
        dispatch(setChats(chats));
        dispatch(setChattingUsers(chattingUsers));

        window.Echo.private(`user.messages.${auth.user.id}`).listen(
            ".NewMessage",
            (message) => {
                console.log("MESSAGE", message);
                dispatch(addNewMessage(message));
            }
        );

        return () => {
            window.Echo.leaveChannel(`user.messages.${auth.user.id}`);
        };
    }, []);

    function scrollToBottomMessages() {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottomMessages();
    }, [selectedUser]);

    function onSubmit(ev) {
        ev.preventDefault();
        if (!inputMessage) return;

        console.log(inputMessage);

        ChatService.newMessage(inputMessage, selectedUser.id)
            .then((r) => console.log(r))
            .finally(() => setInputMessage(""));
    }

    if (!allChats || !allChattingUsers) return <></>;

    console.log(allChats);

    return (
        <ChatLayout auth={auth}>
            <Head title="Chats" />

            {!selectedUser ? (
                <img
                    src="/images/chat-placeholder.jpg"
                    className="h-full w-full bg-contain"
                ></img>
            ) : (
                <div className="h-full">
                    <div
                        className="h-5/6 bg-opacity-30 bg-contain bg-scroll px-2 py-2 overflow-y-auto"
                        style={{
                            backgroundImage:
                                "url('/images/chat-wallpapers/planets.jpg')",
                        }}
                    >
                        {allChats[selectedUser.id].map((message) => (
                            <div
                                key={message.id}
                                className={`chat ${
                                    auth.user.id == message.from
                                        ? "chat-end"
                                        : "chat-start"
                                }`}
                            >
                                <div
                                    className={`chat-bubble ${
                                        auth.user.id == message.from
                                            ? "chat-bubble-success"
                                            : "chat-bubble-primary"
                                    }`}
                                >
                                    {message.text}
                                </div>
                                <div className="chat-footer text-white">
                                    {new Date(
                                        message.created_at
                                    ).toLocaleString()}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form
                        className="h-1/6 w-full bg-violet-200 px-2 flex items-center flex-grow"
                        method="POST"
                        action={"/chat/" + selectedUser.id}
                        onSubmit={(e) => onSubmit(e)}
                    >
                        <div className="dropdown dropdown-top mr-2">
                            <label
                                tabIndex={0}
                                className="m-auto hover:cursor-pointer hover:text-gray-600"
                            >
                                <FaceSmileIcon className="h-8 w-8" />
                            </label>
                            <div
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
                            >
                                <EmojiPicker
                                    onEmojiClick={(emoji) =>
                                        setInputMessage(
                                            (cv) => cv + emoji.emoji
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className="dropdown dropdown-top mr-2">
                            <label
                                tabIndex={1}
                                className="m-auto hover:cursor-pointer hover:text-gray-600"
                            >
                                <PaperClipIcon className="h-8 w-8" />
                            </label>
                            <div
                                tabIndex={1}
                                className="dropdown-content menu p-2 rounded-box transition-all duration-1000 animate-spin"
                            >
                                <div className="flex flex-col gap-6 ">
                                    <div
                                        className="tooltip tooltip-right"
                                        data-tip="File"
                                    >
                                        <PaperClipIcon className="h-16 w-16 p-2 bg-red-500 rounded-full hover:cursor-pointer hover:bg-red-400" />
                                    </div>

                                    <div
                                        className="tooltip tooltip-right"
                                        data-tip="Image"
                                    >
                                        <PhotoIcon className="h-16 w-16 p-2 bg-red-500 rounded-full hover:cursor-pointer hover:bg-red-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(ev) =>
                                setInputMessage(ev.currentTarget.value)
                            }
                            placeholder="Type your message"
                            className="input w-full"
                        />

                        <input
                            type="submit"
                            value={"Send"}
                            className=" btn mx-3"
                        ></input>
                    </form>
                </div>
            )}
        </ChatLayout>
    );
}
