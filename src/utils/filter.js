export const filterTransactionsByMonth = (transactions, targetMonth, targetYear) => {
    return transactions.filter(transaction => {
        const transactionMonth = new Date(transaction.date).getMonth()
        const transactionYear = new Date(transaction.date).getFullYear()

        return transactionMonth === targetMonth && transactionYear === targetYear
    })
}

export const groupTransactionsByDay = (transactions) => {
    const groupedTransactions = {}

    transactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.date).toLocaleDateString()

        if (!groupedTransactions[transactionDate]) {
            groupedTransactions[transactionDate] = []
        }

        groupedTransactions[transactionDate].push(transaction)
    })

    return groupedTransactions
}