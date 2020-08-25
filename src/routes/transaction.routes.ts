import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

import Transaction from '../models/Transaction'
import ValidateTransactionOutcome from '../services/ValidateTransactionOutcome';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface DataFormated{
  transactions : Array<Transaction>;
  balance: Balance | null;
}

transactionRouter.get('/', (request, response) => {
  try {
    //must response { Array<Transaction>, Balance }
    const data: DataFormated = {
      transactions:transactionsRepository.all(),
      balance: transactionsRepository.getBalance()};

    return response.json(data)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body

    const createTransactionService = new CreateTransactionService(transactionsRepository)

    const validateTransactionOutcome = new ValidateTransactionOutcome(transactionsRepository)

    validateTransactionOutcome.execute({ type, value })

    const transaction = createTransactionService.execute({title, type, value})

    return response.json(transaction)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
