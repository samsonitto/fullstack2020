import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, getPatient, getDiagnoses } from "./state";
import { Patient, Diagnose } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./components/PatientPage";

const App: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [page, setPage] = useState('');
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/api/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/api/diagnoses`
        );
        dispatch(getDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnoses();
  }, [dispatch]);

  const showPatient = async (id: string) => {
    try {
      if(Object.values(patient)[0] && Object.values(patient)[0].id === id) {
        setPage(Object.values(patient)[0].id);
      } else {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/api/patients/${id}`);
        dispatch(getPatient(patientFromApi));
        setPage(patientFromApi.id);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path="/">
              <PatientListPage showPatient={showPatient} />  
            </Route>
            <Route path={`/${page}`} >
              <PatientPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
