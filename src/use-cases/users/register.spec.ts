import { expect, describe, it } from 'vitest'
import { RegisterUsers } from './registerUser'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/users/in-memony-users-repository'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    // Users Repository MOCK
    const userRepositoryMock = new InMemoryUsersRepository()

    const registerUseCase = new RegisterUsers(userRepositoryMock)

    const { user } = await registerUseCase.execute({
      name: 'johnathan',
      email: 'johnathan@google.com',
      password: '12345678',
      cep: '019281210',
      cpf_cnpj: '129291910029',
      is_active: true,
    })

    const isPasswordCorretlyHashed = await compare(
      '12345678',
      user.password_hash,
    )

    expect(isPasswordCorretlyHashed).toBe(true)
  })
})
