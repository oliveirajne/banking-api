import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/reset', (req: Request, res: Response) => {
  res.sendStatus(200);
})

export default routes;
