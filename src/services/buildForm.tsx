import { Form, Formik } from "formik";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";

const buildForm = (
  validationSchema: any,
  handleSubmit: any,
  submitButton: any
) => {
  const fields: any = validationSchema.describe().fields;
  const fieldTypes: any = { input: Input, checkbox: Checkbox, select: Select };
  return (
    <Formik
      initialValues={validationSchema.getDefault()}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {Object.entries(fields).map(
          ([
            name,
            {
              meta: { fieldType, ...rest },
              label,
              tests,
            },
          ]: any) => {
            const Field = fieldTypes[fieldType];
            return (
              <Field
                key={name}
                name={name}
                label={label}
                required={tests.some((t: any) => t.name === "required")}
                {...rest}
              />
            );
          }
        )}
        {submitButton}
      </Form>
    </Formik>
  );
};

export default buildForm;
