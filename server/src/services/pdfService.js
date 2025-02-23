import * as pdfjsLib from 'pdfjs-dist';
import logger from '../utils/logger.js';

export const pdfParser = async (buffer) => {
    try {
        const uint8Array = new Uint8Array(buffer);

        const pdfParser = pdfjsLib.getDocument({ data: uint8Array });
        const pdfDocument = await pdfParser.promise;
        let text = '';
    
        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
          const page = await pdfDocument.getPage(pageNum);
          const textContent = await page.getTextContent();
          textContent.items.forEach(item => {
            text += item.str + '';
          });
        }
        const cpfs = text.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/g) || [];
        const cpfsUnicos = [...new Set(cpfs)]; // Remove duplicates
    
        logger.info(`Foram encontrados ${cpfsUnicos.length} CPFs no PDF`);

        return cpfsUnicos;
    } catch (error) {
        logger.error('Erro ao ler o PDF:', error);
        throw new Error('Falha ao ler o PDF');
      }
}