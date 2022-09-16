import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input(props: InputProps) {
  return (
    <>
      {props.label && (
        <label htmlFor={props.name} className="font-semibold">
          {props.label}
        </label>
      )}
      <input
        {...props}
        className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
      />
    </>
  );
}
