export function formatPrice(value: string) {
  const priceNumber =
    typeof value === 'string'
      ? parseFloat(value.replace(',', ' '))
      : parseFloat(value)

  const formattedNumber = priceNumber.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const formattedWithoutSymbol = formattedNumber.replace('$', '')

  return formattedWithoutSymbol.trim()
}
