import express from 'express';
import { PORT } from './config/config.js';
import { router as routes } from './routes/router.js';
import { jwtMiddleware } from './middlewares/jwtMiddleware.js';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
//import cookieParser from 'cookie-parser';
import {cookieMiddleware} from './middlewares/cookieMiddleware.js';

const app = express();

// Middlewares
app.use(corsMiddleware);
app.use(cookieMiddleware);
//app.use(cookieParser());
app.use(express.json());
app.use(jwtMiddleware);

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});