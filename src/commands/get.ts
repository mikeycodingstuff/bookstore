import { Command } from 'commander'
import { getBookById, getAllBooks } from '../db/services/bookService'
import printer from '../utilities/printer'
import { BookNotFoundError } from '../errors/customErrors'
import chalk from 'chalk'

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

async function handleGetAllBooks() {
  try {
    const books = await getAllBooks()
    if (!books) {
      return
    }
    if (books.length > 0) {
      printer.log(`All Books:`, ['magenta', 'inverse'])
      books.forEach((book) => {
        const bookDetails = `${book.title} ${chalk.gray(`- ${book.author}`)}`
        console.log(bookDetails)
      })
    } else {
      printer.log('No books found.', ['red'])
    }
  } catch (error) {
    console.error('Error getting books:', error)
  }
}

export function setupGetCommand(program: Command) {
  program
    .command('get [id]')
    .description('Get details of a book by its ID')
    .option('-a, --all', 'Get details for all books')
    .action(async (id, options) => {
      if (options.all) {
        await handleGetAllBooks()
      } else {
        if (!id && !options.all) {
          console.error(
            'Please provide an ID or use the -a option to get all books.',
          )
        } else {
          await handleGetBook(id)
        }
      }
    })
}
