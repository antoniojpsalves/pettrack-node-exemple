import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { registerUser } from '../../use-cases/registerUser'

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

  const is_active = true

  try {
    await registerUser({ name, cpf_cnpj, cep, email, password, is_active })
  } catch (err) {
    console.error(err)
    reply.code(409).send()
  }

  return reply.code(201).send()
}
