export function formatPrice(value: number) {
  // Formata o número como dólar sem o símbolo "$"
  const formattedNumber = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const formattedWithoutSymbol = formattedNumber.replace('$', '')

  return formattedWithoutSymbol.trim()
}
