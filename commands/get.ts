import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'

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
          console.log('Book Details:')
          console.log(`Title: ${book.title}`)
          console.log(`Author: ${book.author}`)
          console.log(`Genre: ${book.genre}`)
          console.log(`Price: $${book.price}`)
          console.log(`Quantity: ${book.quantity}`)
        } else {
          console.log(`Book with ID ${id} not found.`)
        }
      } catch (error) {
        console.error('Error getting book:', error)
      } finally {
        await prisma.$disconnect()
      }
    })
}
