import style from "./FormInput.module.css";
import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  LabelEl?: React.ReactNode;
}

export const FormInput = (props: IInputProps) => {
  const {
    name: inputName,
    type: inputType = "text",
    id: inputId,
    value,
    placeholder = "",
    autoComplete = "off",
    onChange: onInputChange,
    LabelEl,
    required = true,
    className,
  } = props;
  return (
    <>
      {LabelEl && LabelEl}
      <input
        className={clsx(style.form_input, className && className)}
        id={inputId}
        type={inputType}
        name={inputName}
        value={value || ""}
        onChange={onInputChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </>
  );
};
