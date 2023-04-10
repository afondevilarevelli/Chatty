import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import ChatSidebar from "@/Layouts/Chats/ChatSidebar";
import { BREAKPOINTS } from "@/breakpoints";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";

export default function ChatLayout({ auth, children }) {
    const [sidebarOpened, setSidebarOpened] = useState(true);
    const matchedMinMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`);

    useEffect(() => {
        setSidebarOpened(!matchedMinMd);
    }, [matchedMinMd]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex">
                <div
                    className={`w-0 overflow-hidden md:overflow-auto md:w-2/6 `}
                >
                    <ChatSidebar />
                </div>

                <div className={`flex-1 h-[calc(100vh-theme(space.16))]`}>
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
