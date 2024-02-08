export function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount)
}

export function formatCurrencyToNumber(formattedAmount) {
    // Loại bỏ dấu phẩy và ký hiệu tiền tệ
    const cleanedValue = formattedAmount.replace(/[^\d]/g, '')

    // Chuyển đổi thành giá trị số
    const numericValue = parseFloat(cleanedValue)

    return numericValue
}