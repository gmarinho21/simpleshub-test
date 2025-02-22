import PDFParser from 'pdf2json'
import logger from '../utils/logger.js';

export const pdfParser = async (buffer) => {
    try {
        const pdfParser = new PDFParser()
        const result = await new Promise((resolve, reject) => {
            pdfParser.on('pdfParser_dataReady', (pdfData) => {
                try {
                    const texto = pdfData.Pages.map(page => 
                        page.Texts.map(textItem => 
                          textItem.R.map(r => decodeURIComponent(r.T)).join('')
                        ).join('')
                        ).join('');
                        const cpfs = texto.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/g) || [];
                        resolve([...new Set(cpfs)]);
                } catch(error) {
                    reject(error)
                }
            })
            pdfParser.on('pdfParser_dataError', (error) => {
                reject(error);
              });
            pdfParser.parseBuffer(buffer);
        })
        logger.info(`Found ${result.length} CPFs in PDF`);
        return result;
    } catch (error) {
        logger.error('Error parsing PDF:', error);
        throw new Error('Falha ao ler o PDF');
      }
}