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

try {
  const rawArgs = process.argv.slice(2);
  if (rawArgs.length < 2) throw new Error('Expected target and at least one day of exercise hours');

  const target = Number(rawArgs[0]);
  if (isNaN(target) || target < 0) throw new Error('Target must be a non-negative number');

  const exerciseHours = rawArgs.slice(1).map((v, i) => {
    const n = Number(v);
    if (isNaN(n) || n < 0) throw new Error(`Exercise hour at position ${i + 1} is not a non-negative number`);
    return n;
  });

  console.log(calculateExercises(exerciseHours, target));
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error');
  }
  process.exit(1);
}