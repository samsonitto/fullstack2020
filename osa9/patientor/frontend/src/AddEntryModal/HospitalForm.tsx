import React from "react";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { Props } from "./AddEntryForm";
import { useStateValue } from "../state";

const HospitalForm: React.FC<Props> = ({ onSubmit, onCancel, type}) => {
  const [{diagnoses}] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        specialist: "",
        diagnosisCodes: undefined,
        discharge: {
          date: "",
          criteria:""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if(values.type === "Hospital" && !values.discharge.date || values.type === "Hospital" && !values.discharge.criteria) {
          errors.discharge = requiredError;
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection 
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default HospitalForm