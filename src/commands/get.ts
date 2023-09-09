import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'
import printer from '../utilities/printer'

export function setupGetCommand(program: Command) {
  program
    .command('get <id>')
    .description('Get details of a book by its ID')
    .action(async (id) => {
      const prisma = new PrismaClient()

      try {
        const book = await prisma.book.findUnique({
          where: {
            id: parseInt(id),
          },
        })

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
        } else {
          printer.log(`Book with ID ${id} not found.`, ['red'])
        }
      } catch (error) {
        console.error('Error getting book:', error)
      } finally {
        await prisma.$disconnect()
      }
    })
}
