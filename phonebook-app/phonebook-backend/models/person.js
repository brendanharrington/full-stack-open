import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = model('Person', personSchema);

export default Person