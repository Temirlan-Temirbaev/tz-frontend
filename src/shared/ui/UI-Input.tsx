import React, { HTMLProps } from 'react';
import "./UI-Input.css";

type UIInputProps = {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
} & HTMLProps<HTMLInputElement>;

const UIInput: React.FC<UIInputProps> = ({
                                           label,
                                           name,
                                           type = 'text',
                                           className = '', ...props
                                         }) => {
  return (
    <>
      <div className={`relative input-field flex flex-col ${className}`}>
        <input
          id={name}
          type={type}
          placeholder={""}
          {...props}
          className={`w-full px-3 py-3 border-2 border-primary border-opacity-20 text-black rounded-md focus:outline-none transition-colors duration-300 bg-white`}
        />
        {label && (
          <label
            htmlFor={name}
            className={`absolute text-lg text-gray-500 left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none bg-transparent px-1`}
          >
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default UIInput;
