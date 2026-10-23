export const formatCurrency = (amount: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)

export const formatDate = (date: string | Date): string =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date))

export const formatNumber = (num: number): string =>
  new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)

export const truncate = (str: string, maxLength: number): string =>
  str.length > maxLength ? `${str.slice(0, maxLength)}...` : str
