import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import { useField } from "formik";

const Checkbox = ({ label, name, required, ...props }: any) => {
  const [{ onChange, ...field }, { touched, error }, { setTouched }] = useField(
    {
      name,
      type: "checkbox",
      ...props,
    }
  );
  return (
    <FormControl
      fullWidth
      required={required}
      error={touched && Boolean(error)}
    >
      <FormControlLabel
        label={label}
        control={
          <MuiCheckbox
            id={name}
            onChange={(e) => {
              setTouched(true);
              onChange(e);
            }}
            {...field}
            {...props}
          />
        }
      />
      {touched && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
