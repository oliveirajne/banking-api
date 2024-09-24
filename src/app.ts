import express from 'express';
import routes from './Routes';

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
