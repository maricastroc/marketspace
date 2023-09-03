export function capitalizeFirstLetter(inputString: string) {
  // Verifica se a entrada não é nula ou indefinida e é uma string
  if (typeof inputString === 'string' && inputString.trim() !== '') {
    return inputString
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  } else {
    // Se a entrada for nula, indefinida ou uma string vazia, retorne vazio ou lide com o erro de acordo com sua necessidade
    return ''
  }
}
