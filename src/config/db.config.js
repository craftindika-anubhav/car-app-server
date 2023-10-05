import { connect as _connect } from 'mongoose';

const DB_URI = process.env.MONGODB_URI;

export default async function connectDb() {
  try {
    const connect = await _connect(DB_URI);
    console.log(
      `MongoDB Connected: ${connect.connection.host}:${connect.connection.port}/${connect.connection.name}`
    );
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}
