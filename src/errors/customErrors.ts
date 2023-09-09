class DuplicateBookError extends Error {
  constructor() {
    super('A book with the same title and author already exists.')
    this.name = 'DuplicateBookError'
  }
}

class AddBookError extends Error {
  constructor() {
    super('Error Adding book.')
    this.name = 'AddBookError'
  }
}

export { DuplicateBookError, AddBookError }
