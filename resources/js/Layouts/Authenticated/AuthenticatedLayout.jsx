import AuthenticatedNavbar from "@/Layouts/Authenticated/Navbar";

export default function AuthenticatedLayout({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AuthenticatedNavbar user={user} />

            <main className="min-h-screen pt-16">{children}</main>
        </div>
    );
}
