import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-w-screen min-h-screen flex flex-col">
            <div className="navbar fixed text-primary-content">
                <div className="flex-none">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-secondary-200" />
                </div>
                <div className="flex-1">
                    <Link href={route("index")}>
                        <button className="btn btn-ghost normal-case text-xl ml-2">
                            Chatty
                        </button>
                    </Link>
                </div>
                <div className="flex-none flex gap-3">
                    <Link href={route("login")}>
                        <button className="btn btn-ghost normal-case">
                            About
                        </button>
                    </Link>

                    <Link href={route("login")}>
                        <button className="btn bg-secondary normal-case">
                            Sign In/Up
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 w-auto h-auto">{children}</div>
        </div>
    );
}
