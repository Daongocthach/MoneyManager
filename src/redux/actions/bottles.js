export const addBottle = (user) => {
    return {
        type: 'ADD_BOTTLE',
        payload: user
    }
}

export const updateBottle = (data) => {
    return {
        type: 'UPDATE_BOTTLE',
        payload: data
    }
}

export const deleteBottle = (data) => {
    return {
        type: 'DELETE_BOTTLE',
        payload: data
    }
}
export const incomeToBottles = (data) => {
    return {
        type: 'INCOME_TO_BOTTLES',
        payload: data
    }
}
export const updateIncomeToBottles = (data) => {
    return {
        type: 'UPDATE_INCOME_TO_BOTTLES',
        payload: data
    }
}
export const updateExpenseToBottles = (data) => {
    return {
        type: 'UPDATE_EXPESNE_TO_BOTTLES',
        payload: data
    }
}
export const expenseToBottle = (data) => {
    return {
        type: 'EXPENSE_BOTTLE',
        payload: data
    }
}
export const resetBottles = () => {
    return {
        type: 'RESET_BOTTLES'
    }
}
export const listBottles = (data) => {
    return {
        type: 'LIST_BOTTLES',
        payload: data
    }
}


