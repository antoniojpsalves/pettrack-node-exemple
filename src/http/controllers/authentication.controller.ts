import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { PrismaUsersRepository } from '../../repositories/users/prisma-users-repository'
import { AuthenticateUseCase } from '../../use-cases/authenticate/authenticate'
import { InvalidCredentialsError } from '../../use-cases/authenticate/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()

    const authenticationUseCase = new AuthenticateUseCase(prismaUserRepository)

    await authenticationUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.code(400).send({ message: err.message })
    }

    throw err
  }
  return reply.code(200).send()
}
