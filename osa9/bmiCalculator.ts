type Result = string;

const bmi = (height: number, weight: number) : Result => {
  const calculatedBmi: number = weight / ((height/100)**2);
  
  if (calculatedBmi < 18.5) {
    return 'Underweight (eat more)'
  }
  else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
    return 'Normal (healthy weight)'
  }
  else if (calculatedBmi >= 25 && calculatedBmi < 30) {
    return 'Overweight (exercise more)'
  }
  else if (calculatedBmi > 30) {
    return 'Obese (exercise more and stop eating shit)'
  }
}

console.log(bmi(178, 72));
