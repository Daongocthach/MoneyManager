const initialState = {
    bottles: [
        { id: 0, name: 'Thiết yếu', percent: 55, total: 0 },
        { id: 1, name: 'Giáo dục', percent: 10, total: 0 },
        { id: 2, name: 'Tiết kiệm', percent: 10, total: 0 },
        { id: 3, name: 'Hưởng thụ', percent: 10, total: 0 },
        { id: 4, name: 'Đầu tư', percent: 10, total: 0 },
        { id: 5, name: 'Đóng góp xã hội', percent: 5, total: 0 }
    ]
}
const bottlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_BOTTLE':
            return {
                ...state,
                bottles: [...state.bottles, action.payload]
            }
        case 'UPDATE_BOTTLE': {
            const updateIndex = state.bottles.findIndex(bottle => bottle.id === action.payload.id)
            return {
                ...state,
                bottles: [
                    ...state.bottles.slice(0, updateIndex),
                    action.payload,
                    ...state.bottles.slice(updateIndex + 1)
                ]
            }
        }
        case 'INCOME_TO_BOTTLES': {
            const income = action.payload
            const updatedBottles = state.bottles.map(bottle => {
                const totalForBottle = (income * bottle.percent) / 100
                return {
                    ...bottle,
                    total: bottle.total + totalForBottle
                }
            })

            return {
                ...state,
                bottles: updatedBottles
            }
        }
        case 'EXPENSE_BOTTLE': {
            const updateIndex = state.bottles.findIndex(bottle => bottle.id === action.payload.id)

            if (updateIndex !== -1) {
                const updatedBottle = {
                    ...state.bottles[updateIndex],
                    total: state.bottles[updateIndex].total - action.payload.total
                }
                return {
                    ...state,
                    bottles: [
                        ...state.bottles.slice(0, updateIndex),
                        updatedBottle,
                        ...state.bottles.slice(updateIndex + 1)
                    ]
                }
            } else {
                return state
            }
        }
        case 'DELETE_BOTTLE': {
            const newBottles = state.bottles.filter(bottle => bottle.id !== action.payload.id)
            return {
                ...state,
                bottles: newBottles
            }
        }
        case 'LIST_BOTTLES': {
            return {
                ...state,
                bottles: action.payload
            }
        }
        case 'RESET_BOTTLES': {
            return {
                ...state,
                bottles: initialState.bottles
            }
        }
        default:
            return state
    }
}
export default bottlesReducer