import { expect, describe, it } from 'vitest'
import { RegisterUsers } from './registerUser'
import { compare } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users/users-repository'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    // Users Repository MOCK
    const repositoryMock: UsersRepository = {
      async findByEmail() {
        return null
      },
      async create(data) {
        return {
          id: '1',
          name: data.name,
          cep: data.cep,
          cpf_cnpj: data.cpf_cnpj,
          created_at: new Date(),
          email: data.email,
          is_active: data.is_active,
          password_hash: data.password_hash,
          updated_at: new Date(),
        }
      },
    }

    const registerUseCase = new RegisterUsers(repositoryMock)

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
