import { Router, Request, Response } from 'express';

const routes = Router();

let accounts: Record<string, number> = {};

routes.post('/reset', (req: Request, res: Response) => {
  accounts = {};
  res.sendStatus(200);
})

routes.get('/balance', (req: Request, res: Response) => {
  const accountId = req.query.account_id as string;

  if (accounts[accountId] !== undefined) {
    return res.status(200).send(`${accounts[accountId]}`);
  }

  return res.status(404).send('0');
})

routes.post('/event', (req: Request, res: Response) => {
  const { type, destination, origin, amount } = req.body;

  switch (type) {
    case "deposit":
      const balance = accounts[destination] || 0;
      accounts[destination] = balance + amount;

      return res.status(201).json({ destination: { id: destination, balance: accounts[destination] } });
    case "withdraw":
      if (!accounts[origin]) {
        return res.status(404).send('0');
      }
      accounts[origin] -= amount;

      return res.status(201).json({ origin: { id: origin, balance: accounts[origin] } });
    case "transfer":
      if (!accounts[origin]) {
        return res.status(404).send('0');
      }
      accounts[origin] -= amount;
      accounts[destination] = (accounts[destination] || 0) + amount;

      return res.status(201).json({
        origin: { id: origin, balance: accounts[origin] },
        destination: { id: destination, balance: accounts[destination] },
      });
    default:
      return res.status(404).send('0');
  }
})

export default routes;
