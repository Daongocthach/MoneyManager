export const colors = [
    '#F4A460',
    '#CDB38B',
    '#CDB7B5',
    '#1E90FF',
    '#7AC5CD',
    '#00CD66',
    '#CDC673',
    '#FFC125',
    '#8B658B'
]

export function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}