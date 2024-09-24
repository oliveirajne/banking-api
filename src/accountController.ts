import { Request, Response } from 'express';
import { AccountService } from './AccountService';
import { OperationType } from './OperationType';

const accountService = new AccountService();

export class AccountController {
  public reset(response: Response): void {
    accountService.resetAccounts();
    response.sendStatus(200);
  }

  public getBalance(request: Request, response: Response): Response {
    const accountId = request.query.account_id as string;

    if (!accountService.findAccount(accountId)) {
      return response.status(404).send('0');
    }

    const balance = accountService.getBalance(accountId);

    return response.status(200).send(balance.toString());
  }

  public event(request: Request, response: Response): Response {
    const { type, destination, origin, amount } = request.body;

    switch (type) {
      case OperationType.DEPOSIT:
        const destinationBalance = accountService.deposit(destination, amount);

        return response.status(201).json({
          destination: { id: destination, balance: destinationBalance}
        });
  
      case OperationType.WITHDRAW:
        if (!accountService.findAccount(origin)) {
          return response.status(404).send('0');
        }

        const originBalance = accountService.withdraw(origin, amount);

        return response.status(201).json({
          origin: { id: origin, balance: originBalance}
        });

      case OperationType.TRANSFER:
        if (!accountService.findAccount(origin)) {
          return response.status(404).send('0');
        }

        const balances =  accountService.transfer(origin, destination, amount);

        return response.status(201).json({
          origin: { id: origin, balance: balances.origin },
          destination: { id: destination, balance: balances.destination },
        });

      default:
        return response.status(404).send('0');
    }
  }
}