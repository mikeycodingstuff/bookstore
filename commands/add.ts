import { Command } from 'commander'
import printer from '../utilities/printer'
import { AddBookError, DuplicateBookError } from '../errors/customErrors'
import { createBook } from '../db/services/bookService'

function handleAddBookError(error: unknown) {
  if (error instanceof DuplicateBookError || error instanceof AddBookError) {
    printer.error(error.name, error.message)
  } else {
    console.error('Error adding book:', error)
  }
}

async function handleAddBook(
  title: string,
  author: string,
  genre: string,
  price: string,
  quantity: string,
) {
  try {
    const book = await createBook(title, author, genre, price, quantity)

    printer.line('Book Added', book.title, ['bgMagenta'])
  } catch (error) {
    handleAddBookError(error)
  }
}

export function setupAddCommand(program: Command) {
  program
    .command('add <title> <author> <genre> <price> <quantity>')
    .description('Add a book to the inventory')
    .action(handleAddBook)
}
