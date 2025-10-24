const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const bmi =  weightInKg / ((heightInCm / 100) ** 2);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error('Not enough arguments. Usage: <heightInCm> <weightInKg>');
  }
  
  const [heightArg, weightArg] = args;
  const heightInCm: number = Number(heightArg);
  const weightInKg: number = Number(weightArg);
  
  if (isNaN(heightInCm) || isNaN(weightInKg)) {
    throw new Error('Provided values were not numbers!');
  }
  if (heightInCm <= 0 || weightInKg <= 0) {
    throw new Error('Height and weight must be positive numbers');
  }
  
  console.log(calculateBmi(heightInCm, weightInKg));
}


export default calculateBmi;