import ChattingUserItem from "@/Components/Chats/ChattingUserItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ChatSidebar() {
    const allChattingUsers = useSelector((state) => state.chat.chattingUsers);
    const chats = useSelector((state) => state.chat.chats);

    const [searchText, setSearchText] = useState("");

    const [filteredChattingUsers, setFilteredChattingUsers] = useState([]);

    useEffect(() => {
        setFilteredChattingUsers(sortByLastMessages(allChattingUsers));
    }, [allChattingUsers]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        setFilteredChattingUsers(
            sortByLastMessages(allChattingUsers).filter((u) =>
                u.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };

    function sortByLastMessages(users) {
        return [...users].sort(
            (a, b) =>
                new Date(chats[b.id][chats[b.id].length - 1].created_at) -
                new Date(chats[a.id][chats[a.id].length - 1].created_at)
        );
    }

    return (
        <div className="flex flex-col overflow-x-hidden h-full">
            <form onSubmit={onSubmit} className="bg-white flex-none w-full">
                <div className="form-control">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search…"
                            value={searchText}
                            onChange={(ev) =>
                                setSearchText(ev.currentTarget.value)
                            }
                            className="input input-bordered min-w-0"
                            style={{
                                width: "-webkit-fill-available",
                            }}
                        />

                        <div className="tooltip tooltip-left" data-tip="Clear">
                            <button
                                className="btn btn-square rounded-none bg-red-500 hover:bg-red-600"
                                type="button"
                                disabled={!searchText}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setSearchText("");
                                    setFilteredChattingUsers(allChattingUsers);
                                }}
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="tooltip tooltip-left" data-tip="Search">
                            <button className="btn btn-square rounded-none">
                                <MagnifyingGlassIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="overflow-y-auto flex-grow flex-1">
                <div className="ml-4 mt-4 mb-2 text-gray-700">CHATS</div>

                <ul className="menu p-4 w-auto bg-base-100 text-base-content divide-y">
                    {filteredChattingUsers.map((chatUser) => (
                        <li key={chatUser.id}>
                            <ChattingUserItem chatUser={chatUser} />
                        </li>
                    ))}
                </ul>

                <div className="ml-4 mt-4 mb-2 text-gray-700">CONTACTS</div>

                <ul className="menu p-4 w-auto bg-base-100 text-base-content divide-y">
                    {filteredChattingUsers.map((chatUser) => (
                        <li key={chatUser.id}>
                            <ChattingUserItem chatUser={chatUser} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
