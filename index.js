require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./src/routes/routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
  console.log('Use o token 1234567890 no header x-api-token ou ?token=1234567890')
})