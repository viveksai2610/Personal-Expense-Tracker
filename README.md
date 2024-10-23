Setup and run instructions:
   1. Use "npm install" to install the packages.
   2. Start up the app using "nodemon index.js".

API 1 :
   Request: 
      Path: https://personal-expense-tracker-1-tux2.onrender.com/transactions/
      Method: POST
      Body :   {
                  "id": 12,
                  "transactionType": "Income",
                  "category": "Freelance",
                  "amount": 900,
                  "transactionDate": "2024-9-21",
                  "description": "Freelance project payment"
               }
   Response:
      Success:
           Status code: 200
           Body: Transaction added successfully
           Screenshot : 
               https://github.com/user-attachments/assets/b7cf8829-fa30-41a3-9fd4-70b763b8b826
               
      Failure:
           Status code: 400
           Body: Invalid transaction ID

  API 2 :
   Request: 
      Path: https://personal-expense-tracker-1-tux2.onrender.com/transactions/
      Method: GET
   Response:
      Status code: 200
      Body: [
                   {
                     "id": 1,
                     "transactionType": "Income",
                     "category": "Salary",
                     "amount": 3000,
                     "transactionDate": "2024-10-01",
                     "description": "Monthly salary for October"
                  },
                  {
                     "id": 2,
                     "transactionType": "Expense",
                     "category": "Groceries",
                     "amount": 200,
                     "transactionDate": "2024-10-05",
                     "description": "Grocery shopping at local store"
                  },
                 ....
         ]  
      Screenshot :
          https://github.com/user-attachments/assets/68e70325-bc08-4ea4-b27c-5e1cc1bba887
 API 3 :
   Request: 
       Path: https://personal-expense-tracker-1-tux2.onrender.com/transactions/9/
       Method: GET
   Response:
     Success:
       Status code: 200
       Body: 
            {
               "id": 9,
               "transactionType": "Expense",
               "category": "Dining",
               "amount": 75,
               "transactionDate": "2024-10-20",
               "description": "Dinner at restaurant"
            }
        Screenshot :
           https://github.com/user-attachments/assets/5e91a066-20d8-422d-a437-47b2839ae950
           
     Failure:
           Status code: 400
           Body: Invalid transaction ID       
API 4 :
   Request: 
      Path: https://personal-expense-tracker-1-tux2.onrender.com/transactions/6/
      Method: PUT
      Body :   {
                 "transactionType": "Expense",
                 "category": "Entertainment",
                 "amount": 150,
                 "transactionDate": "2024-6-12",
                 "description": "Movie night with friends"
               }
   Response:
      Success:
           Status code: 200
           Body: Transaction updated successfully
           Screenshot : 
              https://github.com/user-attachments/assets/cb8e7ffc-16d5-485f-a4de-87bc16140400
              
      Failure:
           Status code: 400
           Body: Invalid transaction ID        

API 5 :
   Request: 
      Path: https://personal-expense-tracker-1-tux2.onrender.com/transactions/6/
      Method: DELETE
   Response:
      Success:
           Status code: 200
           Body: Transaction deleted successfully
           Screenshot : 
              https://github.com/user-attachments/assets/846470d3-0fa8-4d63-93d0-f6c6079aa2fa
              
      Failure:
           Status code: 400
           Body: Invalid transaction ID        

API 6 :
   Request: 
      Path: https://personal-expense-tracker-1-tux2.onrender.com/summary/
      Method: GET
   Response:
       Success:
           Status code: 200
           Body: {
                    "totalIncome": 4900,
                    "totalExpenses": 1705,
                    "balance": 3195
                 }                 
           Screenshot : 
              https://github.com/user-attachments/assets/ef6063fd-95af-4fb4-acd7-dc2b70397052
              
       Failure:
           Status code: 400                    

Personal-Expense-Tracker-screen-recording :
    https://github.com/user-attachments/assets/f78f1d40-8a72-45df-af9d-313966a8ed89
           
