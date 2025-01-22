import React from "react";

type ButtonWithIconProps = {
    text: string;
    onClick: () => void;
    icon: React.ReactNode;
    className?: string;
};

export default function ButtonWithIcon({
                                           text,
                                           onClick,
                                           icon,
                                           className = "",
                                       }: ButtonWithIconProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-3 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 flex items-center justify-center space-x-2 ${className}`}
        >
            <span>{text}</span>
            {icon}
        </button>
    );
}
