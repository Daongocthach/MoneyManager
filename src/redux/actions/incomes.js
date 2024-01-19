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
export const resetIncome = () => {
    return {
        type: 'RESET_INCOMES'
    }
}


