import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fileRouter from './api/routes/fileRouter';
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(cookieParser());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.json({
    message: 'routes; /upload',
  });
});


// bind base url for all file routes to mediaRouter
app.use("/", fileRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});