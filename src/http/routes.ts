import { FastifyInstance } from 'fastify'
import { registerNewUser } from './controllers/user.controller'

export async function appRoutes(app: FastifyInstance) {
  // Rota de cadastro de um usuário
  app.post('/users', registerNewUser)
}
