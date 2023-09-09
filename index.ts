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
      });

      console.log(`Added book: ${book.title}`);
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      await prisma.$disconnect();
    }
  });

  await program.parseAsync(process.argv);
  