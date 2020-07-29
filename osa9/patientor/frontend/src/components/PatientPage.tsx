import React, { CSSProperties, useState, useEffect } from "react";
import { useStateValue, addEntry } from "../state";
import { Header, Icon, Button } from "semantic-ui-react";
import { Patient, Diagnose } from '../types';
import EntryDetails from "./EntryDetails";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import AddEntryModal from "../AddEntryModal";

const PatientPage: React.FC = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const [activePatient, setActivePatient] = useState<Patient | undefined>();
  const [activeDiagnoses, setActiveDiagnoses] = useState<Diagnose[] | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    setActivePatient(Object.values(patient)[0]);
    let dias: Array<Diagnose> = [];
    Object.values(diagnoses).forEach(d => {
      Object.values(patient)[0]?.entries.forEach(e => {
        e.diagnosisCodes?.forEach(dc => {
          if (dc === d.code) {
            dias.push(d);
          };
        })
      })
    });
    setActiveDiagnoses(dias);
  },[patient])

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/api/patients/${activePatient?.id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const style: CSSProperties = {
    margin: 0
  }

  console.log(activePatient);
  return (
    <>
      {/* {Object.values(patient).map((p, i) => 
        <div key={i}>
          <Header as='h2'>{p.name}{' '}<Icon name={p.gender === 'male' ? 'man' : 'woman'} /></Header>
          <h4 style={style}>ssn: {p.ssn}</h4> 
          <h4 style={style}>occupation: {p.occupation}</h4> 
        </div>
      )} */}
      <div>
        <Header as='h2'>{activePatient?.name}{' '}<Icon name={activePatient?.gender === 'male' ? 'man' : activePatient?.gender === 'other' ? 'intergender' : 'woman'} /></Header>
        <p style={style}>ssn: {activePatient?.ssn}</p> 
        <p style={style}>occupation: {activePatient?.occupation}</p>

        <h3>entries</h3>
        {activePatient?.entries.map(e =>
          <EntryDetails entry={e} key={e.id} />
        )}
        <div>
          <AddEntryModal onClose={closeModal} error={error} onSubmit={submitNewEntry} modalOpen={modalOpen} />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
      </div>
    </>
  )
  
}

export default PatientPage