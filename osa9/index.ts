import express from 'express';
//const express = require('express')
const app = express();
import { bmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  
  
  try {
    const data: any = {
      weigth: req.query.weight,
      height: req.query.height,
      bmi: bmi(Number(req.query.height), Number(req.query.weight))
    }
    res.json(data);
  } catch (error) {
    res.json({error: error.message})
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});