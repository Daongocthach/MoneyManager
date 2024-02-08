const initialState = {
    incomes: []
}
const incomesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INCOME':
            return {
                ...state,
                incomes: [...state.incomes, action.payload]
            }
        case 'UPDATE_INCOME': {
            const updateIndex = state.incomes.findIndex(income => income.id === action.payload.id)
            return {
                ...state,
                incomes: [
                    ...state.incomes.slice(0, updateIndex),
                    action.payload,
                    ...state.incomes.slice(updateIndex + 1)
                ]
            }
        }
        case 'DELETE_INCOME': {
            const newincomes = state.incomes.filter(income => income.id !== action.payload.id)
            return {
                ...state,
                incomes: newincomes
            }
        }
        case 'LIST_INCOMES': {
            return {
                ...state,
                incomes: action.payload
            }
        }
        case 'RESET_INCOMES': {
            return {
                ...state,
                incomes: initialState.incomes
            }
        }
        default:
            return state
    }
}
export default incomesReducer