import express from 'express'
import { getAllCpfs } from '../services/firebaseService.js';

const app = express()

app.get('/api/cpfs', async (req, res) => {
  try {
    const cpfs = await getAllCpfs();
    res.json(cpfs);
  } catch (error) {
    console.log('Erro ao buscar CPFs:', error);
    res.status(500).json({ error: 'Erro ao buscar CPFs' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});