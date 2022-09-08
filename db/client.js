import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGODB_URI_USERSDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((e) => console.log('Error on initial connection:', e));

const client = mongoose.connection;

client.on('error', () => console.log('error'));

client.on('disconnected', () => console.log('Disconnected from DB'));

export default client;
