import { PrismaClient, Prisma } from '@prisma/client'
import {
  DuplicateBookError,
  AddBookError,
  BookNotFoundError,
  NoBooksError,
} from '../../errors/customErrors'

export async function createBook(
  title: string,
  author: string,
  genre: string,
  price: number,
  quantity: number,
) {
  const prisma = new PrismaClient()

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        price,
        quantity,
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

export async function getBookById(id: number) {
  const prisma = new PrismaClient()

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    })

    if (book) {
      return book
    }

    throw new BookNotFoundError(id)
  } catch (error) {
    if (!(error instanceof BookNotFoundError)) {
      console.error('Error getting book:', error)
    } else {
      throw error
    }
  } finally {
    await prisma.$disconnect()
  }
}

export async function getAllBooks() {
  const prisma = new PrismaClient()

  try {
    const books = await prisma.book.findMany()

    if (books) {
      return books
    }

    throw new NoBooksError()
  } catch (error) {
    if (!(error instanceof NoBooksError)) {
      console.error('Error getting books:', error)
    } else {
      throw error
    }
  } finally {
    await prisma.$disconnect()
  }
}
