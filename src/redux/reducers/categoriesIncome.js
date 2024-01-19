const initialState = {
    categoriesIncome: [
        { id: 0, name: 'Lương', icon: 'cash', color: '#F4A460' },
        { id: 1, name: 'Tiết kiệm', icon: 'account-cash', color: '#00BFFF' },
        { id: 2, name: 'Quà tặng', icon: 'gift', color: 'orange' },
        { id: 3, name: 'Đầu tư', icon: 'trending-up', color: '#00EE76' },
        { id: 4, name: 'Kiếm thêm', icon: 'cash-100', color: '#CDBE70' }
      ]
}
const categoriesIncomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY_INCOME':
            return {
                ...state,
                categoriesIncome: [...state.categoriesIncome, action.payload]
            }
        case 'UPDATE_CATEGORY_INCOME': {
            const updateIndex = state.categoriesIncome.findIndex(categoryIncome => categoryIncome.id === action.payload.id)
            return {
                ...state,
                categoriesIncome: [
                    ...state.categoriesIncome.slice(0, updateIndex),
                    action.payload,
                    ...state.categoriesIncome.slice(updateIndex + 1)
                ]
            }
        }
        case 'DELETE_CATEGORY_INCOME': {
            const newCategoriesIncome = state.categoriesIncome.filter(categoryIncome => categoryIncome.id !== action.payload.id)
            return {
                ...state,
                categoriesIncome: newCategoriesIncome
            }
        }
        default:
            return state
    }
}
export default categoriesIncomeReducer