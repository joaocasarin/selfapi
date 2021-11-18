import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { router as routerV1 } from './routes';
import { ErrorHandler } from './errors';
import { swaggerOptions as swaggerOptionsV1 } from './swagger';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type']
    })
);

app.use('/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerOptionsV1));
app.use('/v1', routerV1);

app.use(ErrorHandler);

export { app };
