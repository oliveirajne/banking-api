import { Router, Request, Response } from 'express';
import { AccountController } from './AccountController';

const routes = Router();
const accountController = new AccountController();

routes.post('/reset', (request: Request, response: Response) => {
  accountController.reset(response);
})

routes.get('/balance', (request: Request, response: Response) => {
  accountController.getBalance(request, response);
})

routes.post('/event', (request: Request, response: Response) => {
  accountController.event(request, response);
})

export default routes;
