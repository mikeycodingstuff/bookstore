class DuplicateBookError extends Error {
  constructor() {
    super('A book with the same title and author already exists.')
    this.name = 'DuplicateBookError'
  }
}

class AddBookError extends Error {
  constructor() {
    super('Error adding book.')
    this.name = 'AddBookError'
  }
}

class BookNotFoundError extends Error {
  constructor(id: number) {
    super(`Book with ID ${id} not found.`)
    this.name = 'BookNotFoundError'
  }
}

class NoBooksError extends Error {
  constructor() {
    super('No books found.')
    this.name = 'NoBooksError'
  }
}

export { DuplicateBookError, AddBookError, BookNotFoundError, NoBooksError }
