import mongoose from 'mongoose';
import Person from './models/Person.js';
import { MONGO_URL } from '../util/config.js';

if (MONGO_URL && !mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL);
}

export { Person };
