import express from 'express';

//const express = require('express')
const app = express();
app.use(express.json())
import { bmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {
      weigth: req.query.weight,
      height: req.query.height,
      bmi: bmi(Number(req.query.height), Number(req.query.weight))
    };
    res.json(data);
    // eslint-disable-next-line
  } catch (error) {
    // eslint-disable-next-line
    res.json({error: error.message});
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { daily_exercises, target } = req.body;
    
    const data = calculateExercises(daily_exercises, target);
    res.json(data);
  } catch (error) {
    res.json({error: error.message});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});