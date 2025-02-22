import admin from 'firebase-admin';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

// Inicialização do Firebase Admin
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
const cpfsRef = db.ref('cpfs');

export const getAllCpfs = async () => {
    try {
        const snapshot = await cpfsRef.once('value');
        const data = snapshot.val() || {};
        return Object.values(data).map(item => ({
            cpf: item.value,
            timestamp: item.timestamp
        }));
    } catch (error) {
        logger.error('Erro ao salvar CPFs no Firebase:', error);
        throw error;
    }
};

export const saveCpfs = async (cpfs) => {
    try {
        const updates = {}
        cpfs.forEach(cpf => {
            updates[cpf.replace(/\./g, '_').replace(/-/g, '_')] = {
                value: cpf,
                timestamp: admin.database.ServerValue.TIMESTAMP
            }
        })
        await cpfsRef.update(updates)
        logger.info(`${cpfs.length} CPFs salvos no Firebase`);
    } catch (error) {
        logger.error('Erro ao salvar CPFs no Firebase:', error);
        throw error;
    }
}