import 'dotenv/config';
import express from 'express';
import FormRouter from './routes/form.route.js';
import AdminRouter from './routes/admin.route.js';
import connectDb from './config/db.config.js';
import cors from 'cors';

async function main() {
  const app = express();
  await connectDb();
  app.use(express.json());
  app.use(
    cors({
      origin: '*',
    })
  );
  app.use('/api/form', FormRouter);
  app.use('/api/admin', AdminRouter);
  app.get('/health', (req, res) => {
    res.status(200).send('ok');
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`On Port ${PORT}!!`);
  });
}
main();
