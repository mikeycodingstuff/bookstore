import { PrismaClient, Prisma } from '@prisma/client'
import { DuplicateBookError, AddBookError } from '../../errors/customErrors'

export async function createBook(
  title: string,
  author: string,
  genre: string,
  price: string,
  quantity: string,
) {
  const prisma = new PrismaClient()

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

    return book
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new DuplicateBookError()
    } else {
      throw new AddBookError()
    }
  } finally {
    await prisma.$disconnect()
  }
}
