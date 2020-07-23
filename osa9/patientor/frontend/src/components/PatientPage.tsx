import React, { CSSProperties, useState, useEffect } from "react";
import { useStateValue } from "../state";
import { Header, Icon } from "semantic-ui-react";
import { Patient } from '../types';

const PatientPage: React.FC = () => {
  const [{ patient }, ] = useStateValue();
  const [activePatient, setActivePatient] = useState<Patient | undefined>();

  useEffect(() => {
    setActivePatient(Object.values(patient)[0])
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
        <Header as='h2'>{activePatient?.name}{' '}<Icon name={activePatient?.gender === 'male' ? 'man' : 'woman'} /></Header>
        <h4 style={style}>ssn: {activePatient?.ssn}</h4> 
        <h4 style={style}>occupation: {activePatient?.occupation}</h4> 
      </div>
    </>
  )
  
}

export default PatientPage