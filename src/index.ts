import dotenv from 'dotenv';
import { connectMongoDb } from './configs/Database';

dotenv.config();
import { app } from './app';

const port = process.env.PORT || 3000;

connectMongoDb();

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`);
});
