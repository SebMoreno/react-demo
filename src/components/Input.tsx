import { TextField as MuiTextField } from "@mui/material";
import { useField } from "formik";
import { useEffect, useRef } from "react";

const Input = ({
  name,
  label,
  required,
  placeholder,
  restrictInput,
  ...props
}: any) => {
  const [{ onChange, ...field }, { touched, error }] = useField({
    name,
    ...props,
  });
  const inputEl: React.RefObject<HTMLInputElement> = useRef(null);
  useEffect(() => {
    inputEl?.current?.removeAttribute("required");
  }, [inputEl]);

  return (
    <MuiTextField
      {...props}
      {...field}
      inputProps={{ ref: inputEl }}
      fullWidth
      onChange={(e) => {
        if (restrictInput) {
          e.target.value = restrictInput(e.target.value);
        }
        onChange(e);
      }}
      id={name}
      label={label}
      required={required}
      placeholder={placeholder}
      helperText={touched && error}
      error={touched && Boolean(error)}
    />
  );
};

export default Input;
