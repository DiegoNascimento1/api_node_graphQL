const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
const usuarios = [];
const tarefas = [];
// Define o esquema GraphQL
const schema = buildSchema(`
  type Tarefa {
    id: ID!
    titulo: String!
    descricao: String!
    concluida: Boolean
    responsavel: Usuario!
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
    criarUsuario(nome: String, email: String): Usuario
    marcarTarefaConcluida(id: ID!): Tarefa
    atualizarTarefa(id: ID!, titulo: String, descricao: String): Tarefa
    excluirTarefa(id: ID!): ID
  }
`);

// Implemente os resolvers
const resolvers = {
  todasTarefas: () => {
    return tarefas;
  },
  tarefaPorID: (args) => {
    const tarefaEncontrada = tarefas.find((tarefa) => tarefa.id === id);
    if (!tarefaEncontrada) {
      throw new Error("Tarefa não encontrada");
    }
    return tarefaEncontrada;
  },
  tarefasConcluidas: () => {
    const tarefasConcluidas = tarefas.filter(
      (tarefa) => tarefa.concluida === true
    );
    return tarefasConcluidas;
  },
  tarefasPendentes: () => {
    const tarefasPendentes = tarefas.filter(
      (tarefa) => tarefa.concluida === false
    );
    return tarefasPendentes;
  },
  todosUsuarios: () => {
    return usuarios;
  },
  criarUsuario: ({ nome, email }) => {
    const novoUsuario = {
      id: String(usuarios.length + 1),
      nome,
      email,
    };
    usuarios.push(novoUsuario);
    return novoUsuario;
  },
  criarTarefa: ({ titulo, descricao, responsavelID }) => {
    if (!titulo || !descricao || !responsavelID) {
      throw new Error(
        "Todos os campos (titulo, descricao, responsavelID) são obrigatórios."
      );
    }

    const responsavel = usuarios.find(
      (usuario) => usuario.id === responsavelID
    );
    if (!responsavel) {
      throw new Error(
        "O responsável com o ID especificado não foi encontrado."
      );
    }

    const novaTarefa = {
      id: String(tarefas.length + 1),
      titulo,
      descricao,
      concluida: false,
      responsavelID,
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
  },
  marcarTarefaConcluida: ({ id }) => {
    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }
    const tarefaIndex = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (tarefaIndex === -1) {
      throw new Error("Tarefa não encontrada");
    }

    tarefas[tarefaIndex].concluida = true;

    return tarefas[tarefaIndex];
  },
  atualizarTarefa: ({ id, titulo, descricao }) => {
    if (!titulo || !descricao || !id) {
      throw new Error(
        "Todos os campos (titulo, descricao, id) são obrigatórios."
      );
    }
    const tarefaIndex = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (tarefaIndex === -1) {
      throw new Error("Tarefa não encontrada");
    }

    if (titulo) {
      tarefas[tarefaIndex].titulo = titulo;
    }

    if (descricao) {
      tarefas[tarefaIndex].descricao = descricao;
    }

    return tarefas[tarefaIndex];
  },
  excluirTarefa: ({ id }) => {
    if (!id) {
      throw new Error("O campo id é obrigatório.");
    }
    const tarefaIndex = tarefas.findIndex((tarefa) => tarefa.id === id);
    if (tarefaIndex === -1) {
      throw new Error("Tarefa não encontrada");
    }

    const tarefaExcluida = tarefas.splice(tarefaIndex, 1)[0];
    return tarefaExcluida;
  },
};

// Configure o middleware GraphQL
app.use(
  "/graphql",
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
