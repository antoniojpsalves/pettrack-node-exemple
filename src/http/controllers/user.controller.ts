import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { prisma } from '../../lib/prisma'

import { hash } from 'bcryptjs'

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

  // criptografando a senha do user
  const password_hash = await hash(password, 6)

  // validando que existe conflito ao tentar cadastrar com o msm cnpj
  const userWithSameCpfCnpj = await prisma.user.findUnique({
    where: {
      cpf_cnpj,
    },
  })

  if (userWithSameCpfCnpj) {
    reply.code(409).send({})
  }

  await prisma.user.create({
    data: {
      name,
      cpf_cnpj,
      cep,
      email,
      password_hash,
      is_active: true,
    },
  })

  return reply.code(201).send()
}
