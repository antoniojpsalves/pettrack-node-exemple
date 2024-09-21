import { Prisma, User } from '@prisma/client'
import { UsersRepository } from './users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      cep: data.cep,
      cpf_cnpj: data.cpf_cnpj,
      updated_at: new Date(),
      is_active: true,
    }
    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(
      (registeredUser) => registeredUser.email === email,
    )

    if (!user) return null

    return user
  }
}
