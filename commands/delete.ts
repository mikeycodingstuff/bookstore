import { Command } from 'commander'
import { PrismaClient } from '@prisma/client'

export function setupDeleteCommand(program: Command) {
  program
    .command('delete <id>')
    .description('Delete a book by its ID')
    .action(async (id) => {
      const prisma = new PrismaClient()

      try {
        const book = await prisma.book.findUnique({
          where: {
            id: parseInt(id),
          },
        })

        if (book) {
          await prisma.book.delete({
            where: {
              id: parseInt(id),
            },
          })

          console.log(`Deleted book with ID ${id}: ${book.title}`)
        } else {
          console.log(`Book with ID ${id} not found.`)
        }
      } catch (error) {
        console.error('Error deleting book:', error)
      } finally {
        await prisma.$disconnect()
      }
    })
}
