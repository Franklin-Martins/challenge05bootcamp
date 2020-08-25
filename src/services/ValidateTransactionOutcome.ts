import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request{
  value: number;

  type:'income' | 'outcome';
}

class ValidateTransactionOutcome{
  private transactionsRepository = new TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type }: Request): void{
    if(type === 'outcome' && this.transactionsRepository.getBalance().total - value <= 0 ){
      throw Error('you cannot make a purchase, because you will be in the negative')
    }
  }

}

export default ValidateTransactionOutcome;
