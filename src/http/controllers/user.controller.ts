/* eslint-disable camelcase */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function registerNewUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    cpf_cnpj: z.string().min(11),
    cep: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, cpf_cnpj, cep, email, password } = registerBodySchema.parse(
    request.body,
  )

  await prisma.user.create({
    data: {
      name,
      cpf_cnpj,
      cep,
      email,
      password_hash: password,
      is_active: true,
    },
  })

  return reply.code(201).send()
}
