const initialState = {
    categoriesExpense: [
        { id: 0, name: 'Thức ăn', icon: 'food', color: 'red' },
        { id: 1, name: 'Quần áo', icon: 'tshirt-v', color: 'pink' },
        { id: 2, name: 'Giáo dục', icon: 'book-education', color: 'orange' },
        { id: 3, name: 'Hóa đơn', icon: 'food', color: 'yellow' },
        { id: 4, name: 'Bữa tiệc', icon: 'food', color: 'blue' },
        { id: 5, name: 'Tiền nhà', icon: 'food', color: 'gray' },
        { id: 6, name: 'Tiền thuốc', icon: 'food', color: 'brown' }
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
        default:
            return state
    }
}
export default categoriesExpenseReducer