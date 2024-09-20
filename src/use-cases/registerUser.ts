import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { RegisterUserDto } from './dtos/registerUserDto'
import { PrismaUsersRepository } from '../repositories/prisma-users-repository'

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

  // instanciando a classe de repository do userCreate
  const prismaUserRepository = new PrismaUsersRepository()

  await prismaUserRepository.create({
    name,
    cpf_cnpj,
    cep,
    email,
    password_hash,
    is_active,
  })
}
