import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  dataSearch?: any;
  defaultSearch?: string;
}

export function Input(props: InputProps) {
  return (
    <>
      {props.label && (
        <label htmlFor={props.name} className="font-semibold">
          {props.label} <span className="text-[#ff0000]">*</span>
        </label>
      )}

      {props.type === "text" && (
        <input
          {...props}
          className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
      )}

      {props.type === "number" && (
        <input
          {...props}
          className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
      )}

      {props.type === "time" && (
        <input
          {...props}
          className="mt-[8px] bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
        />
      )}
    </>
  );
}
