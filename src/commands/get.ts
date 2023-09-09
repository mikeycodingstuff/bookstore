import { Command } from 'commander'
import { getBookById } from '../db/services/bookService'
import printer from '../utilities/printer'
import { BookNotFoundError } from '../errors/customErrors'

function handleGetBookError(error: unknown) {
  if (error instanceof BookNotFoundError) {
    printer.error(error.name, error.message)
  } else {
    console.error('Error adding book:', error)
  }
}

async function handleGetBook(id: string) {
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) {
    console.error('Invalid ID. Please provide a valid number.')
    return
  }

  try {
    const book = await getBookById(parsedId)
    if (book) {
      const bookDetails = [
        `Title: ${book.title}`,
        `Author: ${book.author}`,
        `Genre: ${book.genre}`,
        `Price: $${book.price}`,
        `Quantity: ${book.quantity}`,
      ]

      printer.log('Book Details:', ['magenta', 'inverse'])
      printer.log(bookDetails.join('\n'))
    }
  } catch (error) {
    handleGetBookError(error)
  }
}

export function setupGetCommand(program: Command) {
  program
    .command('get <id>')
    .description('Get details of a book by its ID')
    .action(handleGetBook)
}
