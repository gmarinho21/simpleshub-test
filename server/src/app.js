import express from 'express'
import multer from 'multer'
import { getAllCpfs } from '../services/firebaseService.js';
import  { pdfParser } from '../services/pdfService.js';

const app = express()
const upload = multer()

app.get('/api/cpfs', async (req, res) => {
  try {
    const cpfs = await getAllCpfs();
    res.json(cpfs);
  } catch (error) {
    console.log('Erro ao buscar CPFs:', error);
    res.status(500).json({ error: 'Erro ao buscar CPFs' });
  }
});

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  const pdfBuffer = req.file.buffer;
  const cpfs = await pdfParser(pdfBuffer);
  res.send('pdf subiu sem erros')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});