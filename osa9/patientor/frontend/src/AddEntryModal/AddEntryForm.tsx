import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection, HealthOption, SelectHealthField } from "./FormField";
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { NumberField } from "../AddPatientModal/FormField";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import OccupationalHealthcareForm from "./OccupationalForm";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

type HospitalEntryFormValues = Omit<HospitalEntry, "id" | "date">;
type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id" | "date">;
type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id" | "date">;
export type EntryFormValues = OccupationalEntryFormValues | HospitalEntryFormValues | HealthCheckEntryFormValues;

export interface Props {
  type: string;
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export interface OccupationalProps {
  type: string;
  onSubmit: (values: OccupationalEntryFormValues) => void;
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
      <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} type={type} />
    )
  } else {
    return (
      <Header>Something went wrong...</Header>
    )
  }
};

export default AddEntryForm;
