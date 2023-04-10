import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function AuthenticatedNavbar({ user }) {
    return (
        <nav className="navbar bg-base-100 fixed h-16 z-50">
            <div className="flex-1">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-secondary-200" />
                <Link
                    className="btn btn-ghost normal-case text-xl ml-2"
                    href={route("chats.index")}
                >
                    Chatty
                </Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <BellIcon className="h-5 w-5" />
                            <span className="badge badge-sm indicator-item">
                                8
                            </span>
                        </div>
                    </label>
                    <div
                        tabIndex={0}
                        className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                    >
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">
                                    View cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img src={user.image} />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link
                                href={route("profile.edit")}
                                className="justify-between"
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="justify-between"
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
