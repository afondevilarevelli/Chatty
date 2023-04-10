export default function AuthProcessLayout({ children }) {
    return (
        <div className="flex w-screen h-screen">
            <img
                src="images/auth-wallpaper.jpg"
                className="md:flex-1 h-full md:w-1/2 w-0"
            />
            <div className="flex-1 px-12 w-auto mt-16 flex flex-col gap-8">
                <h1 className="self-center text-3xl italic font-semibold">
                    Chatty
                </h1>
                {children}
            </div>
        </div>
    );
}
