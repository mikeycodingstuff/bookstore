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

export function setupAddCommand(program: Command) {
  program
    .command('add <title> <author> <genre> <price> <quantity>')
    .description('Add a book to the inventory')
    .action(async (title, author, genre, price, quantity) => {
      try {
        const book = await createBook(title, author, genre, price, quantity)
        printer.log(`Added book: ${book.title}`, 'green')
      } catch (error) {
        handleAddBookError(error)
      }
    })
}
