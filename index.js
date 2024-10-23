const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'expenseTracker.db')
const app = express()

app.use(express.json())

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})
    app.listen(3000, () => {
      console.log('Server Running')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(-1)
  }
}
initializeDBAndServer()

app.post('/transactions/', async (request, response) => {
  const {id, transactionType, category, amount, transactionDate, description} =
    request.body
  const getTransactionQuery = `
      SELECT
       *
      FROM
       transactions
      WHERE
       id = ${id};
    `
  const transaction = await db.get(getTransactionQuery)
  if (transaction === undefined) {
    const createTransactionQuery = `
      INSERT INTO 
        transactions (id,transactionType,category,amount,transactionDate,description) 
      VALUES 
        (  
           ${id}, 
          '${transactionType}',
          '${category}', 
           ${amount},
          '${transactionDate}',
          '${description}'
        )`
    await db.run(createTransactionQuery)
    response.send(`Transaction added successfully`)
  } else {
    response.status(400)
    response.send('Invalid transaction ID')
  }
})

app.get('/transactions/', async (request, response) => {
  const getTransactionsQuery = `
      SELECT
       *
      FROM
       transactions;
    `
  const transactions = await db.all(getTransactionsQuery)
  response.send(transactions)
})

app.get('/transactions/:id/', async (request, response) => {
  const {id} = request.params
  const getTransactionQuery = `
      SELECT
       *
      FROM
       transactions
      WHERE
       id = ${id};
    `
  const transaction = await db.get(getTransactionQuery)
  if (transaction !== undefined) {
    const getTransactionQuery = `
      SELECT
       *
      FROM
       transactions
      WHERE
       id = ${id};
    `
    const transaction = await db.get(getTransactionQuery)
    response.send(transaction)
  } else {
    response.status(400)
    response.send('Invalid transaction ID')
  }
})

app.put('/transactions/:id/', async (request, response) => {
  const {id} = request.params
  const {transactionType, category, amount, transactionDate, description} =
    request.body
  const getTransactionQuery = `
      SELECT
       *
      FROM
       transactions
      WHERE
       id = ${id};
    `
  const transaction = await db.get(getTransactionQuery)
  if (transaction !== undefined) {
    const updateTransactionQuery = `
      UPDATE
       transactions
      SET 
       transactionType = '${transactionType}',
       category = '${category}',
       amount = ${amount},
       transactionDate = '${transactionDate}',
       description = '${description}'
      WHERE
       id = ${id};
    `
    db.run(updateTransactionQuery)
    response.send('Transaction updated successfully')
  } else {
    response.status(400)
    response.send('Invalid transaction ID')
  }
})

app.delete('/transactions/:id/', async (request, response) => {
  const {id} = request.params
  const getTransactionQuery = `
      SELECT
       *
      FROM
       transactions
      WHERE
       id = ${id};
    `
  const transaction = await db.get(getTransactionQuery)
  if (transaction !== undefined) {
    const deleteTransactionQuery = `
      DELETE
      FROM
       transactions
      WHERE
       id = ${id};
    `
    await db.run(deleteTransactionQuery)
    response.send('Transaction deleted successfully')
  } else {
    response.status(400)
    response.send('Invalid transaction ID')
  }
})

app.get('/summary/', async (request, response) => {
  let totalIncome = 0
  let totalExpenses = 0
  const getIncomeQuery = `
      SELECT
       SUM(amount) AS totalIncome
      FROM
       transactions
       where transactionType = "Income";
    `

  const income = await db.get(getIncomeQuery)
  totalIncome = income.totalIncome
  const getExpensesQuery = `
      SELECT
       SUM(amount) AS totalExpenses
      FROM
       transactions
       where transactionType = "Expense";
    `

  const expenses = await db.get(getExpensesQuery)
  totalExpenses = expenses.totalExpenses
  let balance = totalIncome - totalExpenses
  const summary = {totalIncome, totalExpenses, balance}
  response.send(summary)
})
