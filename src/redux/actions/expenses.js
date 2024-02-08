export const addExpense = (data) => {
    return {
        type: 'ADD_EXPENSE',
        payload: data
    }
}

export const updateExpense = (data) => {
    return {
        type: 'UPDATE_EXPENSE',
        payload: data
    }
}

export const deleteExpense = (data) => {
    return {
        type: 'DELETE_EXPENSE',
        payload: data
    }
}
export const listExpenses = (data) => {
    return {
        type: 'LIST_EXPENSES',
        payload: data
    }
}
export const resetExpenses = () => {
    return {
        type: 'RESET_EXPENSES'
    }
}

