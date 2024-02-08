export const addCategoryIncome = (data) => {
    return {
        type: 'ADD_CATEGORY_INCOME',
        payload: data
    }
}

export const updateCategoryIncome = (data) => {
    return {
        type: 'UPDATE_CATEGORY_INCOME',
        payload: data
    }
}
export const deleteCategoryIncome = (data) => {
    return {
        type: 'DELETE_CATEGORY_INCOME',
        payload: data
    }
}

export const listCategoriesIncome = (data) => {
    return {
        type: 'LIST_CATEGORIES_INCOME',
        payload: data
    }
}
export const resetCategoriesIncome = () => {
    return {
        type: 'RESET_CATEGORIES_INCOME'
    }
}
