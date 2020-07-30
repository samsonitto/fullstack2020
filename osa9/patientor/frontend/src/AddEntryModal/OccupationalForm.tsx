import React from "react";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField, TextFieldObject } from "./FormField";
import { Grid, Button, Header } from "semantic-ui-react";
import { OccupationalProps } from "./AddEntryForm";
import { useStateValue } from "../state";
import moment from "moment";

const OccupationalHealthcareForm: React.FC<OccupationalProps> = ({ onSubmit, onCancel, type}) => {
  const [{diagnoses}] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Wrong date format";
        const dateErrorStart = "Input start date";
        const dateErrorEnd = "Input end date";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.startDate && !moment(values.sickLeave?.startDate, 'YYYY-MM-DD', true).isValid()) {
          console.log(errors);
          errors.sickLeaveStart = dateError;
        }
        if (values.sickLeave?.endDate && !moment(values.sickLeave?.endDate, 'YYYY-MM-DD', true).isValid()) {
          errors.sickLeaveEnd = dateError;
        }
        if (values.sickLeave?.startDate && !values.sickLeave.endDate) {
          errors.sickLeaveEnd = dateErrorEnd;
        }
        if (values.sickLeave?.endDate && !values.sickLeave.startDate) {
          errors.sickLeaveStart = dateErrorStart;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Header>Occupational Healthcare</Header>
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
              label="Employer"
              placeholder="Name of the Employer"
              name="employerName"
              component={TextField}
            />
            <Header>Sickleave</Header>
            <Field
              label="Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              id="sickLeaveStart"
              component={TextFieldObject}
            />
            <Field
              label="End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              id="sickLeaveEnd"
              component={TextFieldObject}
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

export default OccupationalHealthcareForm