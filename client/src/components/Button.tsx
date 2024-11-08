import React from "react";

export interface ButtonProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    outline?: boolean;
    text: string;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, startIcon, endIcon, type, outline }) => {
    return (
        <button className={`${outline ? 'border border-customGray2': 'bg-customBlue1 text-white'} text-xs py-2 px-7 rounded-lg`} type={type} onClick={onClick}>{startIcon ? startIcon: ''}{text} {endIcon ? endIcon: ''}</button>
    )
}

export default Button;