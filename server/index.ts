import express, { Application } from 'express';
import router from './router';

const app: Application = express();
const port = 3001;
app.use(express.json());
app.use(router);

app.listen(port, () => {
	console.log(` 🚀 Server up and running on http://localhost:${port} 🚀`);
});
