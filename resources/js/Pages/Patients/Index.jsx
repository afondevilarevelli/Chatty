import React from "react";
import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Dropdown from "@/Components/UI/Dropdown";
import {
    PencilIcon,
    EllipsisVerticalIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";

export default function Index({ patients, auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Patients" />

            <div className="py-12">
                <table className="border-spacing-5 w-full">
                    <thead>
                        <tr className="text-left">
                            <th></th>
                            <th>Name</th>
                            <th>Age</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2">
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td className="py-2">
                                    <img
                                        src={patient.image}
                                        className="w-24 h-24 rounded-full"
                                    />
                                </td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-full p-2 hover:bg-white cursor-pointer">
                                                <EllipsisVerticalIcon className="h-6 w-6" />
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <div className="p-2 items-center gap-2 hover:bg-gray-200 flex cursor-pointer">
                                                <PencilIcon className="h-4 w-4" />
                                                <div>Edit</div>
                                            </div>
                                            <div className="p-2 items-center gap-2 hover:bg-red-200 flex cursor-pointer">
                                                <TrashIcon className="h-4 w-4 hover:text-black text-red-500" />
                                                <div>Delete</div>
                                            </div>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
