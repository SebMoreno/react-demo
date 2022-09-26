import * as yup from "yup";
import { Formik, Form } from "formik";
import Input from "../components/Input";
import Select from "../components/Select";
import Checkbox from "./../components/Checkbox";
import { Button } from "@mui/material";
const jobTypes = [
  { value: "designer", label: "Designer" },
  { value: "development", label: "Developer" },
  { value: "product", label: "Product Manager" },
  { value: "other", label: "Other" },
];
const validationSchema = yup.object({
  firstName: yup
    .string()
    .ensure()
    .label("First Name")
    .max(15, "Must be 15 characters or less")
    .required("${label} is required")
    .meta({ fieldType: "input", placeholder: "Jane" }),
  lastName: yup
    .string()
    .ensure()
    .label("Last Name")
    .max(20, "Must be 20 characters or less")
    .required("${label} is required")
    .uppercase()
    .meta({ fieldType: "input", placeholder: "Doe" }),
  email: yup
    .string()
    .ensure()
    .label("Email")
    .email("Invalid email address")
    .required("${label} is required")
    .meta({ fieldType: "input", type: "email", placeholder: "test@email.com" }),
  jobType: yup
    .string()
    .ensure()
    .label("Job Type")
    .oneOf(
      jobTypes.map((job) => job.value),
      "Invalid Job Type"
    )
    .required("${label} is required")
    .meta({
      fieldType: "select",
      options: jobTypes,
      placeholder: "Select a job type",
    }),
  notes: yup
    .string()
    .ensure()
    .label("Notes")
    .required("${label} is required")
    .meta({
      fieldType: "input",
      multiline: true,
      rows: 4,
      placeholder: "Set a note for us to get better",
    }),
  terms: yup
    .boolean()
    .default(false)
    .label("I accept the terms and conditions")
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions.")
    .meta({ fieldType: "checkbox" }),
});
const fieldsDesc: any = validationSchema.describe().fields;
const handleSubmit = (values: any, { setSubmitting }: any) => {
  setTimeout(() => {
    console.log(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const SignupForm = () => {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={validationSchema.getDefault()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Input
            name="firstName"
            label={fieldsDesc["firstName"].label}
            required={fieldsDesc["firstName"].tests.some(
              (t: any) => t.name === "required"
            )}
            placeholder="Jane"
            restrictInput={(value: string) =>
              value.toUpperCase().replace(/[^A-Z]/g, "")
            }
          />
          <Input
            name="lastName"
            label={fieldsDesc["lastName"].label}
            required={fieldsDesc["lastName"].tests.some(
              (t: any) => t.name === "required"
            )}
            placeholder="Doe"
          />
          <Input
            name="email"
            label={fieldsDesc["email"].label}
            required={fieldsDesc["email"].tests.some(
              (t: any) => t.name === "required"
            )}
            placeholder="test@email.com"
          />
          <Select
            name="jobType"
            label={fieldsDesc["jobType"].label}
            required={fieldsDesc["jobType"].tests.some(
              (t: any) => t.name === "required"
            )}
            options={jobTypes}
            placeholder="Select a job type"
          />
          <Input
            name="notes"
            label={fieldsDesc["notes"].label}
            required={fieldsDesc["notes"].tests.some(
              (t: any) => t.name === "required"
            )}
            multiline
            rows="5"
            placeholder="test@email.com"
          />
          <Checkbox
            name="terms"
            label={fieldsDesc["terms"].label}
            required={fieldsDesc["terms"].tests.some(
              (t: any) => t.name === "required"
            )}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default SignupForm;
