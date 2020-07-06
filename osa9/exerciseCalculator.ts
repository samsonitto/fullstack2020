interface TrainingOverview {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number) : TrainingOverview => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(h => h > 0).length;
  const average = (hours.reduce((a, b) => a + b, 0)) / periodLength
  let rating;
  const calcRating = () => {
    const diff = average - target
    if (diff >= 0 && diff < 0.5) {
      rating = 3
    }
    else if (diff >= 0.5 && diff < 1) {
      rating = 4
    }
    else if (diff >= 1) {
      rating = 5
    }
    else if (diff < 0 && diff >= -0.5) {
      rating = 2
    }
    else if (diff < -0.5 && diff >= -1) {
      rating = 1
    }
    else if (diff < -1) {
      rating = 0
    }
  }
  calcRating();
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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
