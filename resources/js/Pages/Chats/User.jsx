import ChatLayout from "@/Layouts/Chats/ChatLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    FaceSmileIcon,
    PaperClipIcon,
    PhotoIcon,
} from "@heroicons/react/24/solid";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function Chat({ auth, chattingUsers, chats, messages }) {
    const [inputMessage, setInputMessage] = useState("");
    const { url } = usePage();

    function onSubmit(ev) {
        ev.preventDefault();
        if (!inputMessage) return;

        console.log(inputMessage);
    }

    return (
        <ChatLayout auth={auth} chattingUsers={chattingUsers} chats={chats}>
            <Head title="Chat" />

            <div className="h-full">
                <div
                    className="h-5/6 bg-opacity-30 bg-contain bg-scroll px-2 py-2 overflow-y-auto"
                    style={{
                        backgroundImage:
                            "url('/images/chat-wallpapers/planets.jpg')",
                    }}
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat ${
                                auth.user.id == message.from
                                    ? "chat-end"
                                    : "chat-start"
                            }`}
                        >
                            <div className="chat-bubble chat-bubble-primary">
                                {message.text}
                            </div>
                            <div className="chat-footer text-white">
                                {new Date(message.created_at).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    className="h-1/6 w-full bg-violet-200 px-2 flex items-center flex-grow"
                    method="POST"
                    action={
                        "/chat/" + url.split("/")[url.split("/").length - 1]
                    }
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
                                    setInputMessage((cv) => cv + emoji.emoji)
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
        </ChatLayout>
    );
}
