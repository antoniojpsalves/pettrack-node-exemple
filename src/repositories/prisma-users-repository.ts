import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    // usuário que acabou de ser inserido no banco
    return user
  }
}
