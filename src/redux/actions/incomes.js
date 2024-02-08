export const addIncome = (data) => {
    return {
        type: 'ADD_INCOME',
        payload: data
    }
}

export const updateIncome = (data) => {
    return {
        type: 'UPDATE_INCOME',
        payload: data
    }
}

export const deleteIncome = (data) => {
    return {
        type: 'DELETE_INCOME',
        payload: data
    }
}
export const listIncomes = (data) => {
    return {
        type: 'LIST_INCOMES',
        payload: data
    }
}
export const resetIncomes = () => {
    return {
        type: 'RESET_INCOMES'
    }
}


