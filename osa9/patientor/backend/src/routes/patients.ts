import express from 'express';
import patientService from '../services/patientService'
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient)

    res.json(addedPatient)
    
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    //const patient = patientService.findById(req.params.id)
    const newEntry = req.body;
    const addedEntry = patientService.addEntry(newEntry)

    res.json(addedEntry)

    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id)

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

export default router;