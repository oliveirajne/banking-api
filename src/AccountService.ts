export class AccountService {
  private accounts: Record<string, number> = {};

  public resetAccounts(): void {
    this.accounts = {};
  }

  public getBalance(accountId: string): number | null {
    return this.accounts[accountId] !== undefined ? this.accounts[accountId] : null;
  }

  public deposit(destination: string, amount: number): number {
    const balance = this.accounts[destination] || 0;

    this.accounts[destination] = balance + amount;

    return this.accounts[destination];
  }

  public withdraw(origin: string, amount: number): number | null {
    if (!this.accounts[origin]) {
      return null;
    }

    this.accounts[origin] -= amount;

    return this.accounts[origin];
  }

  public transfer(origin: string, destination: string, amount: number): any {
    if (!this.accounts[origin]) {
      return null;
    }

    const balances = {
      origin: this.withdraw(origin, amount),
      destination: this.deposit(destination, amount)
    }

    return balances; 
  }
}
