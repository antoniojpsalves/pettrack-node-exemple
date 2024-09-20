# Backend de teste para o app trackpet

Tcc part 1 - App de rastreio de pets

## RFs (Requisitos funcionais)

- [ ] Deve ser possível cadastrar um novo usuário
- [ ] Deve ser possível editar os dados de um usuário
- [ ] Deve ser possível realizar login tendo usuário e senha

## RNs (Regras de negócio)

- 

## RNFs (Requisitos não funcionais)

- 



---

# Para rodar o projeto no seu ambiente local

## Adicione as variaveis de ambiente corretamente no arquivo
- .env

## Rode o container do docker que contem o banco de dados postgresql
- docker compose up -d

## Aplique as migrations no banco de dados
- npx prisma migrate dev

### :tada: pronto!
