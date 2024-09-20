import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { RegisterUserDto } from './dtos/registerUserDto'

export async function registerUser({
  name,
  cpf_cnpj,
  cep,
  email,
  password,
  is_active,
}: RegisterUserDto) {
  const password_hash = await hash(password, 6)

  const userWithSameCpfCnpj = await prisma.user.findUnique({
    where: {
      cpf_cnpj,
    },
  })

  if (userWithSameCpfCnpj) {
    throw new Error('Email already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      cpf_cnpj,
      cep,
      email,
      password_hash,
      is_active,
    },
  })
}
