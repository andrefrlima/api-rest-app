const database = require('../database/connection')

// Validação simples dos campos obrigatórios
function validarCampos(body) {
  const erros = []
  if (!body.tarefa || String(body.tarefa).trim() === '') erros.push('tarefa é obrigatória')
  if (!body.responsavel || String(body.responsavel).trim() === '') erros.push('responsavel é obrigatório')
  return erros
}

class TaskController {
  // CREATE
  async incluirTarefa(req, res) {
    try {
      const { tarefa, descricao = null, responsavel } = req.body
      const erros = validarCampos(req.body)
      if (erros.length) return res.status(400).json({ erros })

      const [id] = await database('tarefas').insert({ tarefa, descricao, responsavel })
      return res.status(201).json({ id, message: 'Tarefa criada com sucesso' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao criar tarefa' })
    }
  }

  // READ - listar todas
  async listarTarefas(req, res) {
    try {
      const tarefas = await database.select('*').from('tarefas').orderBy('id', 'desc')
      return res.json(tarefas)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao listar tarefas' })
    }
  }

  // READ - obter uma
  async obterTarefa(req, res) {
    try {
      const { id } = req.params
      const tarefa = await database('tarefas').where({ id }).first()
      if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada' })
      return res.json(tarefa)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao obter tarefa' })
    }
  }

  // UPDATE
  async atualizarTarefa(req, res) {
    try {
      const { id } = req.params
      const { tarefa, descricao = null, responsavel } = req.body
      const erros = validarCampos(req.body)
      if (erros.length) return res.status(400).json({ erros })

      const updated = await database('tarefas').where({ id }).update({ tarefa, descricao, responsavel })
      if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' })
      return res.json({ message: 'Tarefa atualizada com sucesso' })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' })
    }
  }

  // DELETE
  async excluirTarefa(req, res) {
    try {
      const { id } = req.params
      const deleted = await database('tarefas').where({ id }).del()
      if (!deleted) return res.status(404).json({ error: 'Tarefa não encontrada' })
      return res.status(204).send()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Erro ao excluir tarefa' })
    }
  }
}

module.exports = new TaskController()