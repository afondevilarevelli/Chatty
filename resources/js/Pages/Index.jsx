import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Index({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout>
            <Head title="Welcome" />

            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url("/images/hero-background.jpg")`,
                    backgroundSize: "cover",
                    backgroundPositionY: "bottom",
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md -mt-32">
                        <h1 className="mb-5 text-5xl font-bold">
                            Let´s connect
                        </h1>
                        <p className="mb-5 text-xl">
                            Interact with your friends in a fast fancy way.
                        </p>
                        <Link href={route("login")}>
                            <button className="btn btn-primary btn-wide">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
