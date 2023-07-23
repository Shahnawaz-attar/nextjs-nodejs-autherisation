import { log } from 'console';
import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      log('connection is successfully connected');
    });

    connection.on('error', (err) => {
      log(`mongo db error please check is it running ${err}`);
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
}
