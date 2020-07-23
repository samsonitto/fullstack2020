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

  console.log(activePatient);

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
            {e.diagnosisCodes?.map(dc => 
              <li><strong>{dc}</strong></li>
            )}
          </div>
        )}
      </div>
    </>
  )
  
}

export default PatientPage