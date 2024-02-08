const initialState = {
    categoriesExpense: [
        { id: 0, name: 'Thức ăn', icon: 'food', color: '#F4A460' },
        { id: 1, name: 'Quần áo', icon: 'tshirt-v', color: '#00BFFF' },
        { id: 2, name: 'Giáo dục', icon: 'book-education', color: 'orange' },
        { id: 3, name: 'Y tế', icon: 'hospital-box', color: '#00EE76' },
        { id: 4, name: 'Đi lại', icon: 'train-car', color: '#CDBE70' },
        { id: 5, name: 'Mua sắm', icon: 'shopping', color: 'gray' },
        { id: 6, name: 'Hóa đơn', icon: 'note-outline', color: '#F4A460' }
      ]
}
const categoriesExpenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY_EXPENSE':
            return {
                ...state,
                categoriesExpense: [...state.categoriesExpense, action.payload]
            }
        case 'UPDATE_CATEGORY_EXPENSE': {
            const updateIndex = state.categoriesExpense.findIndex(categoryExpense => categoryExpense.id === action.payload.id)
            return {
                ...state,
                categoriesExpense: [
                    ...state.categoriesExpense.slice(0, updateIndex),
                    action.payload,
                    ...state.categoriesExpense.slice(updateIndex + 1)
                ]
            }
        }
        case 'DELETE_CATEGORY_EXPENSE': {
            const newCategoriesExpense = state.categoriesExpense.filter(categoryExpense => categoryExpense.id !== action.payload.id)
            return {
                ...state,
                categoriesExpense: newCategoriesExpense
            }
        }
        case 'LIST_CATEGORIES_EXPENSE': {
            return {
                ...state,
                categoriesExpense: action.payload
            }
        }
        case 'RESET_CATEGORIES_EXPESE': {
            return {
                ...state,
                categoriesExpense: initialState.categoriesExpense
            }
        }
        default:
            return state
    }
}
export default categoriesExpenseReducer