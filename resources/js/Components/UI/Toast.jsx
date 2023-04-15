import React from "react";

const typeMapping = {
    normal: "",
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error",
};

export default function Toast({ type = "normal", children }) {
    return (
        <div className="toast toast-top toast-end">
            <div className={"alert " + (typeMapping[type] | "")}>
                <div>
                    <span>New mail arrived.</span>
                </div>
            </div>
            <div className="alert alert-success">
                <div>
                    <span>{children}</span>
                </div>
            </div>
        </div>
    );
}
