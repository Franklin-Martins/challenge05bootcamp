import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    let totalBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0
    };
    for(let i of this.transactions){
      if(i.type === 'income'){
        totalBalance.income += i.value;
        totalBalance.total += i.value;
      }
      if(i.type === 'outcome'){
        totalBalance.outcome += i.value;
        totalBalance.total -= i.value;
      }
    }

    return totalBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value , type})

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
