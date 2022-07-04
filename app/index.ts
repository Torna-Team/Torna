import express, { Application } from 'express';
import router from './router';
import cors from 'cors';

const app: Application = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
	res.status(200).send('Hello server is running');
});

app.listen(port, () => {
	console.log(` 🚀 Server up and running on http://localhost:${port} 🚀`);
});
