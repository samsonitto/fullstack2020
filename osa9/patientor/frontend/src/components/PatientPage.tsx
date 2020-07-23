import React, { CSSProperties, useState, useEffect } from "react";
import { useStateValue } from "../state";
import { Header, Icon } from "semantic-ui-react";
import { Patient, Diagnose } from '../types';

const PatientPage: React.FC = () => {
  const [{ patient, diagnoses }, ] = useStateValue();
  const [activePatient, setActivePatient] = useState<Patient | undefined>();
  const [activeDiagnoses, setActiveDiagnoses] = useState<Diagnose[] | undefined>();

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

  const style: CSSProperties = {
    margin: 0
  }
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
          <div key={e.id}>
            <p>{e.date} <i>{e.description}</i></p>
            {activeDiagnoses?.map(ad =>
            <li key={ad.code}><strong>{ad.code}</strong> {ad.name}</li>  
            )}
          </div>
        )}
      </div>
    </>
  )
  
}

export default PatientPage