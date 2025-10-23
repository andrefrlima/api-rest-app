# API REST – Tarefas

API REST didática (Node.js + Express + MySQL) para demonstrar CRUD básico com autenticação por token e validação de campos.

Repositório Git: `https://github.com/andrefrlima/api-rest-app.git`

## Tecnologias
- Node.js (Express)
- MySQL (Knex + mysql2)
- Dotenv

## Requisitos
- Node.js 18+
- MySQL 8+ (ou MariaDB compatível)

## Banco de Dados

Crie o banco e a tabela:

```sql
CREATE DATABASE IF NOT EXISTS `api_app`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE `api_app`;

CREATE TABLE IF NOT EXISTS `tarefas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tarefa` VARCHAR(85) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descricao` TEXT COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `responsavel` VARCHAR(65) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;
```

## Configuração

1) Clone o projeto:
```bash
git clone https://github.com/andrefrlima/api-rest-app.git
cd api-rest-app
```

2) Crie o arquivo `.env`:
```env
PORT=4000
DB_HOST=127.0.0.1
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=api_app
DB_PORT=3306
API_TOKEN=1234567890
```

3) Instale as dependências e execute:
```bash
npm install
npm start
# API em: http://localhost:4000
```

## Autenticação

Envie o token **1234567890** no cabeçalho `x-api-token` **ou** como `?token=1234567890`.

Exemplo de cabeçalho:
```
x-api-token: 1234567890
```

## Endpoints

| Método | Rota              | Descrição                       | Body (JSON)                                     |
|-------:|-------------------|----------------------------------|-------------------------------------------------|
| GET    | `/tarefas`        | Lista todas as tarefas          | —                                               |
| GET    | `/tarefas/:id`    | Retorna uma tarefa por ID       | —                                               |
| POST   | `/tarefas`        | Cria uma nova tarefa            | `{ tarefa, descricao?, responsavel }`           |
| PUT    | `/tarefas/:id`    | Atualiza uma tarefa existente   | `{ tarefa, descricao?, responsavel }`           |
| DELETE | `/tarefas/:id`    | Remove uma tarefa               | —                                               |

> Validação: `tarefa` e `responsavel` são **obrigatórios** em **POST** e **PUT**.

## Exemplos (cURL)

Listar:
```bash
curl -H "x-api-token: 1234567890" http://localhost:4000/tarefas
```

Criar:
```bash
curl -X POST http://localhost:4000/tarefas   -H "Content-Type: application/json" -H "x-api-token: 1234567890"   -d '{"tarefa":"Estudar Node","descricao":"CRUD simples","responsavel":"Vanderlei"}'
```

Obter por ID:
```bash
curl -H "x-api-token: 1234567890" http://localhost:4000/tarefas/1
```

Atualizar:
```bash
curl -X PUT http://localhost:4000/tarefas/1   -H "Content-Type: application/json" -H "x-api-token: 1234567890"   -d '{"tarefa":"Estudar Node (atualizado)","descricao":"com token","responsavel":"Vanderlei"}'
```

Excluir:
```bash
curl -X DELETE -H "x-api-token: 1234567890" http://localhost:4000/tarefas/1
```

## Respostas comuns

- `401 Unauthorized` – token ausente ou inválido  
- `400 Bad Request` – campos obrigatórios ausentes (`tarefa`, `responsavel`)  
- `404 Not Found` – tarefa não encontrada  
- `500 Internal Server Error` – erro inesperado no servidor

## Estrutura mínima do projeto

```
api-rest-app/
├─ src/
│  ├─ index.js
│  ├─ routes.js
│  ├─ database/
│  │  └─ connection.js
├─ .env.example
├─ package.json
└─ README.md
```

## Licença
Uso educacional/didático. Ajuste conforme sua necessidade.
