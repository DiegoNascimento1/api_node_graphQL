# API GraphQL de Tarefas

Este é um exemplo de uma API GraphQL que permite aos usuários gerenciar tarefas e usuários. Esta API oferece consultas e mutações para criar, listar, atualizar e excluir tarefas, bem como listar usuários.

## Instruções de Uso

Certifique-se de que você tenha o Node.js instalado na sua máquina.

1. Clone este repositório:

        git clone https://github.com/DiegoNascimento1/api_node_graphQL

2. Navegue até o diretório do projeto:

        cd api_node_graphQL

3. Instale as dependências:

        npm install

4. Inicie o servidor:

        node server.js

5. A API GraphQL estará disponível em `http://localhost:4000/graphql`.

## Consultas GraphQL

Aqui estão algumas consultas que você pode fazer:

- **Listar todas as tarefas:**

```graphql
query {
todasTarefas {
 id
 titulo
 descricao
 concluida
}
}
```

- **Listar todos os usuários:**
```graphql
query {
  todosUsuarios {
    id
    nome
    email
  }
}
```

- **Obter uma tarefa específica por ID:**
```graphql
query {
  tarefaPorID(id: "1") {
    id
    titulo
    descricao
    concluida
  }
}
```

- **Listar tarefas concluídas:**
```graphql
query {
  tarefasConcluidas {
    id
    titulo
    descricao
    concluida
  }
}
```

- **Listar tarefas pendentes:**
```graphql
query {
  tarefasPendentes {
    id
    titulo
    descricao
    concluida
  }
}
```

## Mutations GraphQL
Aqui estão algumas mutações que você pode fazer:

- **Criar uma nova tarefa:**
```graphql
mutation {
  criarTarefa(titulo: "Nova Tarefa", descricao: "Descrição da tarefa") {
    id
    titulo
    descricao
    concluida
  }
}
```

- **Marcar uma tarefa como concluída:**
```graphql
mutation {
  marcarTarefaConcluida(id: "1") {
    id
    titulo
    descricao
    concluida
  }
}
```

- **Atualizar informações de uma tarefa existente:**
```graphql
mutation {
  atualizarTarefa(id: "1", titulo: "Tarefa atualizada", descricao: "Nova descrição") {
    id
    titulo
    descricao
    concluida
  }
}
```

- **Excluir uma tarefa:**
```graphql
mutation {
  excluirTarefa(id: "1")
}
```

Contribuindo
Sinta-se à vontade para contribuir com este projeto! Se você encontrar problemas ou tiver ideias para melhorar a API, abra uma "Issue" ou envie um "Pull Request".