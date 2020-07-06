type Result = string;

interface CheckBmiValues {
  value1: number;
  value2: number;
}

const parseValues = (args: Array<string>): CheckBmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

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

try {
  const { value1, value2 } = parseValues(process.argv);
  console.log(bmi(value1, value2));  
} catch (error) {
  console.log('Error, something bad happened, message: ', error.message);
}


