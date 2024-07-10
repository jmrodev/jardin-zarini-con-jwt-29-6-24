import express from 'express';
import { PORT } from './config/config.js';
import path from 'path';
import { router as routes } from './routes/router.js';
import { jwtMiddleware } from './middlewares/jwtMiddleware.js';
import { jsonMiddleware } from './middlewares/jsonMiddleware.js';
import { cookieMiddleware } from './middlewares/cookieMiddleware.js';
import { corsMiddleware } from './middlewares/corsMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();
// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

// Middlewares
app.use(corsMiddleware);
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(jsonMiddleware);
app.use(express.json());
app.use(jwtMiddleware);

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
