import GuestLayout from "@/Layouts/AuthProcessLayout";
import { Head } from "@inertiajs/react";
import LoginForm from "@/Components/auth/LoginForm";
import SignUpForm from "@/Components/auth/SignUpForm";
import Tabs from "@/Components/UI/Tabs";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const [tabItems] = useState([
        {
            label: "Login",
            component: (
                <>
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <LoginForm canResetPassword={canResetPassword} />;
                </>
            ),
        },
        { label: "Register", component: <SignUpForm /> },
    ]);

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Tabs items={tabItems} />
        </GuestLayout>
    );
}
