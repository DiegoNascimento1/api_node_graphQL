const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Define o esquema GraphQL
const schema = buildSchema(`
  type Tarefa {
    id: ID!
    titulo: String!
    descricao: String
    concluida: Boolean
    responsavel: Usuario
  }

  type Usuario {
    id: ID!
    nome: String!
    email: String!
  }

  type Query {
    todasTarefas: [Tarefa]
    tarefaPorID(id: ID!): Tarefa
    tarefasConcluidas: [Tarefa]
    tarefasPendentes: [Tarefa]
    todosUsuarios: [Usuario]
  }

  type Mutation {
    criarTarefa(titulo: String!, descricao: String, responsavelID: ID): Tarefa
    marcarTarefaConcluida(id: ID!): Tarefa
    atualizarTarefa(id: ID!, titulo: String, descricao: String): Tarefa
    excluirTarefa(id: ID!): ID
  }
`);

// Implemente os resolvers
const resolvers = {
  todasTarefas: () => { /* Implemente a lógica para retornar todas as tarefas */ },
  tarefaPorID: (args) => { /* Implemente a lógica para retornar uma tarefa específica */ },
  tarefasConcluidas: () => { /* Implemente a lógica para retornar tarefas concluídas */ },
  tarefasPendentes: () => { /* Implemente a lógica para retornar tarefas pendentes */ },
  todosUsuarios: () => { /* Implemente a lógica para retornar todos os usuários */ },
  criarTarefa: (args) => { /* Implemente a lógica para criar uma nova tarefa */ },
  marcarTarefaConcluida: (args) => { /* Implemente a lógica para marcar uma tarefa como concluída */ },
  atualizarTarefa: (args) => { /* Implemente a lógica para atualizar informações de uma tarefa */ },
  excluirTarefa: (args) => { /* Implemente a lógica para excluir uma tarefa */ },
};

// Configure o middleware GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true, 
  })
);

// Inicie o servidor
const port = 4000;
app.listen(port, () => {
  console.log(`Servidor GraphQL rodando em http://localhost:${port}/graphql`);
});