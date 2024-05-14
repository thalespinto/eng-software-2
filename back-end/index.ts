import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// importando rotas
import userRoute from './routes/user.routes';
import caronaRoute from './routes/carona.routes';

// usando rotas
app.use('/user', userRoute);
app.use('/carona', caronaRoute);

app.listen(port, () => console.log(`Express app running on port ${port}!`));