import { TransferResponse } from "./TransferResponse";

export class AccountService {
  private accounts: Record<string, number> = {};

  public resetAccounts(): void {
    this.accounts = {};
  }

  public findAccount(accountId: string): boolean {
    return this.accounts[accountId] !== undefined;
  }

  public getBalance(accountId: string): number {
    return this.accounts[accountId];
  }

  public deposit(destination: string, amount: number): number {
    const balance = this.accounts[destination] || 0;

    this.accounts[destination] = balance + amount;

    return this.accounts[destination];
  }

  public withdraw(origin: string, amount: number): number {
    this.accounts[origin] -= amount;

    return this.accounts[origin];
  }

  public transfer(origin: string, destination: string, amount: number): TransferResponse {
    const balances = {
      originBalance: this.withdraw(origin, amount),
      destinationBalance: this.deposit(destination, amount)
    }

    return balances; 
  }
}
