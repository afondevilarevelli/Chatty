import ChatLayout from "@/Layouts/Chats/ChatLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    FaceSmileIcon,
    PaperClipIcon,
    PhotoIcon,
    ArrowDownIcon,
} from "@heroicons/react/24/solid";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import {
    setChatAsRead,
    setChats,
    setChattingUsers,
} from "@/store/slices/ChatSlice";
import { ChatService } from "@/services/ChatService";
import {
    addNewCreatedMessage,
    addNewReceivedMessage,
    setContacts,
    setUserStatus,
} from "../../store/slices/ChatSlice";
import React from "react";

export default function Chat({ auth, users, chattingUsers, chats }) {
    const [inputMessage, setInputMessage] = useState("");
    const [showUnreadMessagesDisclaimer, setShowUnreadMessagesDisclaimer] =
        useState(false);

    const selectedUser = useSelector((state) => state.chat.selectedUser);
    const contacts = useSelector((state) => state.chat.contacts);
    const allChats = useSelector((state) => state.chat.chats);
    const allChattingUsers = useSelector((state) => state.chat.chattingUsers);
    const chatsUnread = useSelector((state) => state.chat.chatsUnread);

    const dispatch = useDispatch();

    const messagesEndRef = React.createRef();

    useEffect(() => {
        dispatch(setChats(chats));
        dispatch(setChattingUsers(chattingUsers));
        dispatch(setContacts(users));

        window.Echo.private(`user.messages.${auth.user.id}`).listen(
            ".NewMessage",
            (message) => {
                dispatch(addNewReceivedMessage(message));
            }
        );

        window.Echo.join(`chat.room`)
            .here((users) => {
                users.forEach((u) => {
                    if (u.id != auth.user.id)
                        dispatch(setUserStatus({ id: u.id, isOnline: true }));
                });
            })
            .joining((user) => {
                dispatch(setUserStatus({ id: user.id, isOnline: true }));
            })
            .leaving((user) => {
                dispatch(setUserStatus({ id: user.id, isOnline: false }));
            })
            .error((error) => {
                console.error(error);
            });

        return () => {
            window.Echo.leave(`user.messages.${auth.user.id}`);
            window.Echo.leave(`chat.room`);
        };
    }, []);

    useEffect(() => {
        if (selectedUser && unreadMessages() > 0)
            setShowUnreadMessagesDisclaimer(true);
    }, [chatsUnread, selectedUser]);

    useEffect(() => {
        setShowUnreadMessagesDisclaimer(false);
    }, [selectedUser]);

    useEffect(() => {
        scrollToBottomMessages();
    }, [selectedUser]);

    useEffect(() => {
        if (
            allChats &&
            selectedUser &&
            allChats[selectedUser.id].length > 0 &&
            allChats[selectedUser.id][allChats[selectedUser.id].length - 1]
                .from == auth.user.id
        )
            scrollToBottomMessages();
    }, [allChats, selectedUser]);

    function unreadMessages() {
        return chatsUnread[selectedUser.id] ? chatsUnread[selectedUser.id] : 0;
    }

    function scrollToBottomMessages() {
        messagesEndRef.current?.scrollIntoView();
    }

    function onSubmit(ev) {
        ev.preventDefault();
        if (!inputMessage) return;

        console.log(inputMessage);

        ChatService.newMessage(inputMessage, selectedUser.id)
            .then((r) => {
                dispatch(addNewCreatedMessage(r.data.message));
            })
            .finally(() => setInputMessage(""));
    }

    function onScrollChat(e) {
        const reachedBottom =
            e.target.scrollHeight - e.target.scrollTop ===
            e.target.clientHeight;

        if (reachedBottom && showUnreadMessagesDisclaimer) {
            setShowUnreadMessagesDisclaimer(false);
            dispatch(setChatAsRead(selectedUser.id));
        }
    }

    if (!allChats || !allChattingUsers | !contacts) return <></>;

    return (
        <ChatLayout auth={auth}>
            <Head title="Chats" />

            {!selectedUser ? (
                <img
                    src="/images/chat-placeholder.jpg"
                    className="h-full w-full bg-contain relative"
                ></img>
            ) : (
                <div className="h-full">
                    <div
                        className="h-5/6 bg-opacity-30 bg-contain bg-scroll px-2 py-2 overflow-y-auto"
                        style={{
                            backgroundImage:
                                "url('/images/chat-wallpapers/planets.jpg')",
                        }}
                        onScroll={onScrollChat}
                    >
                        {allChats[selectedUser.id].map((message, idx) => (
                            <div
                                key={idx}
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

                    {showUnreadMessagesDisclaimer && (
                        <div className="absolute left-1/2 -translate-y-16 translate-x-1/2 z-40">
                            <div className="bg-secondary rounded-md py-2 px-4 flex gap-4 animate-bounce">
                                <ArrowDownIcon className="h-6 w-6 text-white" />
                                <div className="text-white">
                                    {unreadMessages()} Unread messages
                                </div>
                            </div>
                        </div>
                    )}

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
