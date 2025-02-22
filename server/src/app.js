import express from 'express'
import multer from 'multer'
import cors from 'cors';
import { getAllCpfs, saveCpfs } from './services/firebaseService.js';
import  { pdfParser } from './services/pdfService.js';
import logger from './utils/logger.js';

const MAX_NUMBER_OF_FILES = 5

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, //5 MB
    files: MAX_NUMBER_OF_FILES 
  }})

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

app.post('/api/upload', upload.array('pdf', MAX_NUMBER_OF_FILES), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({error: 'Nenhum arquivo foi enviado'})
    }

    const allCpfs = [];

    for (const file of req.files) {
      logger.info(`Processando arquivo PDF: ${file.originalname}`)

      const pdfBuffer = file.buffer;
      const cpfs = await pdfParser(pdfBuffer)

      if (cpfs.length > 0) {
        allCpfs.push(...cpfs)
      }
    }

    if (allCpfs.length === 0) {
      logger.info('Nenhum CPF encontrado nos arquivos')
      return res.json({ cpfs: [] })
    }

    await saveCpfs(allCpfs);
    logger.info(`${allCpfs.length} CPFs salvos com sucesso`);

    res.json({cpfs: allCpfs})
  } catch (error) {
    logger.error('Erro ao processar PDF:', error);
    res.status(500).json({ error: 'Erro ao processar o arquivo' });
  }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});