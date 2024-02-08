export const addCategoryExpense = (data) => {
    return {
        type: 'ADD_CATEGORY_EXPENSE',
        payload: data
    }
}

export const updateCategoryExpense = (data) => {
    return {
        type: 'UPDATE_CATEGORY_EXPENSE',
        payload: data
    }
}

export const deleteCategoryExpense = (data) => {
    return {
        type: 'DELETE_CATEGORY_EXPENSE',
        payload: data
    }
}

export const listCategoriesExpense = (data) => {
    return {
        type: 'LIST_CATEGORIES',
        payload: data
    }
}

export const resetCategoriesExpense = () => {
    return {
        type: 'RESET_CATEGORIES_EXPESE'
    }
}