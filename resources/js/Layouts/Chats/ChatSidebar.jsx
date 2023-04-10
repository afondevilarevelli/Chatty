import ChattingUserItem from "@/Components/Chats/ChattingUserItem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ChatSidebar() {
    const allChattingUsers = useSelector((state) => state.chat.chattingUsers);

    const [searchText, setSearchText] = useState("");

    const [filteredChattingUsers, setFilteredChattingUsers] = useState([]);

    useEffect(() => {
        setFilteredChattingUsers(allChattingUsers);
    }, [allChattingUsers]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        setFilteredChattingUsers(
            allChattingUsers.filter((u) =>
                u.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };

    return (
        <div className="h-[calc(100vh-theme(space.16))] bg-slate-200 w-0 md:w-full">
            <div>
                <form onSubmit={onSubmit}>
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

                            <div className="tooltip" data-tip="Clear">
                                <button
                                    className="btn btn-square rounded-r-none bg-red-500 hover:bg-red-600"
                                    type="button"
                                    disabled={!searchText}
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setSearchText("");
                                        setFilteredChattingUsers(
                                            allChattingUsers
                                        );
                                    }}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <button className="btn btn-square">
                                <MagnifyingGlassIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </form>

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
