
import { combineReducers } from 'redux'
import authReducer from './auth'
import categoriesIncomeReducer from './categoriesIncome'
import categoriesExpenseReducer from './categoriesExpense'
import bottlesReducer from './bottles'
import incomesReducer from './incomes'
import expensesReducer from './expenses'

const rootReducer = combineReducers({
    auth: authReducer,
    categoriesIncome: categoriesIncomeReducer,
    categoriesExpense: categoriesExpenseReducer,
    bottles: bottlesReducer,
    incomes: incomesReducer,
    expenses: expensesReducer
})

export default rootReducer