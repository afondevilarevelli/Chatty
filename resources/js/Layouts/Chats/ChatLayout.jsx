import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import ChatSidebar from "@/Layouts/Chats/ChatSidebar";

export default function ChatLayout({ auth, children }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="flex">
                <div
                    className={`flex-none h-[calc(100vh-theme(space.16))] w-4/12`}
                >
                    <ChatSidebar />
                </div>

                <div
                    className={`flex-1 h-[calc(100vh-theme(space.16))] flex-grow`}
                >
                    {children}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
