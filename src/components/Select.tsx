import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";
import { useState, useEffect, useRef } from "react";

const Select = ({
  options,
  label,
  name,
  placeholder,
  required,
  ...props
}: any) => {
  const [focused, setFocused] = useState(false);
  const [{ onBlur, ...field }, { touched, error, initialValue }] = useField({
    name,
    ...props,
  });
  const inputEl = useRef<{ node: HTMLInputElement }>(null);
  useEffect(() => {
    inputEl?.current?.node?.removeAttribute("required");
  }, []);

  const labelId = name + "-label";

  return (
    <FormControl
      fullWidth
      required={required}
      error={touched && Boolean(error)}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        inputProps={{ ref: inputEl }}
        displayEmpty={focused}
        onOpen={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          onBlur(e);
        }}
        id={name}
        label={label}
        labelId={labelId}
        {...field}
        {...props}
      >
        <MenuItem value={initialValue}>{placeholder}</MenuItem>
        {options.map(({ value, label }: any) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
      {touched && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
export default Select;
