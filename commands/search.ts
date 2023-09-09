import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'

export function setupSearchCommand(program: Command) {
  program
    .command('search <title>')
    .description('Search for a book by its title')
    .action(async (title) => {
      const prisma = new PrismaClient()

      try {
        const books = await prisma.book.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        })

        if (books.length > 0) {
          console.log('Matching Books:')
          books.forEach((book, index) => {
            console.log(`Book ${index + 1}:`)
            console.log(`Title: ${book.title}`)
            console.log(`Author: ${book.author}`)
            console.log(`Genre: ${book.genre}`)
            console.log(`Price: $${book.price}`)
            console.log(`Quantity: ${book.quantity}`)
          })
        } else {
          console.log(`No books found with the title "${title}".`)
        }
      } catch (error) {
        console.error('Error searching books:', error)
      } finally {
        await prisma.$disconnect()
      }
    })
}
