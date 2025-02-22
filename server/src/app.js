import express from 'express'
import multer from 'multer'
import cors from 'cors';
import { getAllCpfs, saveCpfs } from './services/firebaseService.js';
import  { pdfParser } from './services/pdfService.js';
import logger from './utils/logger.js';

const app = express()
const upload = multer()

app.use(cors());

app.get('/api/cpfs', async (req, res) => {
  try {
    const cpfs = await getAllCpfs();
    res.json(cpfs);
  } catch (error) {
    logger.error('Erro ao buscar CPFs:', error);
    res.status(500).json({ error: 'Erro ao buscar CPFs' });
  }
});

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: 'Nenhum arquivo foi enviado'})
    }
    logger.info(`Processando arquivo PDF: ${req.file.originalname}`);
  
    const pdfBuffer = req.file.buffer;
    const cpfs = await pdfParser(pdfBuffer);
  
    await saveCpfs(cpfs)
    logger.info(`${cpfs.length} CPFs salvos com sucesso`);

    res.json(cpfs)
  } catch (error) {
    logger.error('Erro ao processar PDF:', error);
    res.status(500).json({ error: 'Erro ao processar o arquivo' });
  }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});