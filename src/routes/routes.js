require('dotenv').config();
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

// Middleware simples de autenticação por token
function authToken(req, res, next) {
  const token = req.header('x-api-token') || req.query.token
  if (token === process.env.API_TOKEN) return next()
  return res.status(401).json({ error: 'Token inválido ou ausente' })
}

// Rotas públicas (ex.: para teste)
router.get('/', (req, res) => res.json({ ok: true }))

// Todas as rotas de tarefas exigem token
router.use('/tarefas', authToken)

// CRUD de tarefas
router.get('/tarefas', TaskController.listarTarefas)        // listar
router.get('/tarefas/:id', TaskController.obterTarefa)      // obter 1
router.post('/tarefas', TaskController.incluirTarefa)       // criar
router.put('/tarefas/:id', TaskController.atualizarTarefa)  // alterar
router.delete('/tarefas/:id', TaskController.excluirTarefa) // excluir

module.exports = router