import { PrismaClient } from '@prisma/client'
import { Command } from 'commander'

const prisma = new PrismaClient()

const program = new Command()

program
  .command('add <title> <author> <genre> <price> <quantity>')
  .description('Add a book to the inventory')
  .action(async (title, author, genre, price, quantity) => {
    try {
      const book = await prisma.book.create({
        data: {
          title,
          author,
          genre,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      })

      console.log(`Added book: ${book.title}`)
    } catch (error) {
      console.error('Error adding book:', error)
    } finally {
      await prisma.$disconnect()
    }
  })

program
  .command('search <title>')
  .description('Search for a book by its title')
  .action(async (title) => {
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

program
  .command('get <id>')
  .description('Get details of a book by its ID')
  .action(async (id) => {
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

program
  .command('delete <id>')
  .description('Delete a book by its ID')
  .action(async (id) => {
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

await program.parseAsync(process.argv)
