interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h !== 0).length;
  const success = trainingDays >= target;
  const average = exerciseHours.reduce((acc, sum) => acc + sum, 0) / periodLength;
  let rating, ratingDescription;

  if (average < target) {
    rating = 1;
    ratingDescription = 'ok';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'good';
  } else {
    rating = 3;
    ratingDescription = 'great';
  }

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