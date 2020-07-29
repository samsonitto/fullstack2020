import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection, HealthOption, SelectHealthField } from "./FormField";
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { NumberField } from "../AddPatientModal/FormField";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

type HospitalEntryFormValues = Omit<HospitalEntry, "id" | "date">;
type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id" | "date">;
type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id" | "date">;
export type EntryFormValues = HospitalEntryFormValues | HealthCheckEntryFormValues | OccupationalEntryFormValues;

export interface Props {
  type: string;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  
}

const typeOptions: TypeOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "Health Check", label: "Health Check" },
  { value: "Occupational Healthcare", label: "Occupational Healthcare" }
];

const healthOptions: HealthOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy"},
  { value: HealthCheckRating.LowRisk, label: "Low Risk"},
  { value: HealthCheckRating.HighRisk, label: "High Risk"},
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk"},
]

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {

  const [{ diagnoses }, ] = useStateValue();

  const onTypeChange = (e: any) => {
    console.log('value', e.target.value)
  }

  if (type === "Hospital") {
    return (
      <HospitalForm onCancel={onCancel} onSubmit={onSubmit} type={type} />
    );
  } 
  else if (type === "Health Check") {
    return (
      <HealthCheckForm onSubmit={onSubmit} onCancel={onCancel} type={type} />
    );
  } else if (type === "Occupational") {
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
              <SelectField
                label="Type"
                name="type"
                options={typeOptions}
              />
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
    )
  } else {
    return (
      <Header>Something went wrong...</Header>
    )
  }
};

export default AddEntryForm;
