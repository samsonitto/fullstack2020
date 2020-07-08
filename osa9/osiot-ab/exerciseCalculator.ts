interface TrainingOverview {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface CheckValues {
  value1: number;
  value2: Array<number>;
}

const parseArguments = (args: Array<string>): CheckValues => {

  const numbers = args.filter(n => !isNaN(Number(n)));

  if (numbers.length === (args.length - 2)) {
    const value1 = numbers[0];
    const value2 = numbers.slice(1);
    return {
      value1: Number(value1),
      value2: value2.map(a => Number(a))
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateExercises = (hours: Array<number>, target: number) : TrainingOverview => {
  if (!hours || !target) {
    throw new Error('Parameters missing')
  }

  const numbers = hours.filter(n => !isNaN(Number(n)));
  if (numbers.length !== hours.length || isNaN(target)) {
    throw new Error('Provided values were not numbers')
  }

  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const average = (hours.reduce((a, b) => a + b, 0)) / periodLength;
  const diff = average - target;
  const rating = 
    diff >= 0 && diff < 0.5 ? 3 :
    diff >= 0.5 && diff < 1 ? 4 :
    diff >= 1 ? 5 :
    diff < 0 && diff >= -0.5 ? 2 :
    diff < -0.5 && diff >= -1 ? 1 :
    0
  
  const success = average >= target ? true : false;
  const ratingDescription = 
    rating === 0 ? 'Terrible! You did not do anything!' : 
    rating === 1 ? 'Not good enough! Try harder next week!' :
    rating === 2 ? 'Not too bad, but could be better.' :
    rating === 3 ? 'Good! You have reached your goal!' :
    rating === 4 ? 'Very good! you have exceeded your goal!' :
    'Amazing! You should elevate your goal!';
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateExercises(value2, value1));
} catch (error) {
  // eslint-disable-next-line
  console.log('Error, something bad happened, message: ', error.message);
}
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
