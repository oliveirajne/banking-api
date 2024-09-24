import { Request, Response } from 'express';
import { AccountService } from "./AccountService";
import { OperationType } from './OperationType';

const accountService = new AccountService;

export class AccountController {
  public reset(response: Response): void {
    accountService.resetAccounts();
    response.sendStatus(200);
  }

  public getBalance(request: Request, response: Response): any {
    const accountId = request.query.account_id as string;
    const balance = accountService.getBalance(accountId);

    if (!balance) {
      return response.status(404).send('0'); 
    }

    return response.status(200).send(balance.toString());
  }

  public event(request: Request, response: Response): any {
    const { type, destination, origin, amount } = request.body;

    switch (type) {
      case OperationType.DEPOSIT:
        const destinationBalance = accountService.deposit(destination, amount);

        return response.status(200).send(destinationBalance.toString());
      case OperationType.WITHDRAW:
        const originBalance = accountService.withdraw(origin, amount);

        if (!originBalance) {
          return response.status(404).send('0'); 
        }
        return response.status(200).send(originBalance.toString());
      case OperationType.TRANSFER:
        const balances =  accountService.transfer(origin,destination,amount);

        if (!balances) {
          return response.status(404).send('0');
        }

        return response.status(201).json({
          origin: { id: origin, balance: balances.origin },
          destination: { id: destination, balance: balances.destination },
        });
      default:
        return response.status(404).send('0');
    }
  }
}