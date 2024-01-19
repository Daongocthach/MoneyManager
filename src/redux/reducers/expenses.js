const initialState = {
    expenses: []
}
const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }
        case 'UPDATE_EXPENSE': {
            const updateIndex = state.expenses.findIndex(expense => expense.id === action.payload.id)
            return {
                ...state,
                expenses: [
                    ...state.expenses.slice(0, updateIndex),
                    action.payload,
                    ...state.expenses.slice(updateIndex + 1)
                ]
            }
        }

        case 'DELETE_EXPENSE': {
            const newexpenses = state.expenses.filter(expense => expense.id !== action.payload.id)
            return {
                ...state,
                expenses: newexpenses
            }
        }
        case 'RESET_EXPENSES': {
            return {
                ...state,
                expenses: []
            }
        }
        default:
            return state
    }
}
export default expensesReducer