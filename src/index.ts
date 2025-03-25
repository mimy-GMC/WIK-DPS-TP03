import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PING_LISTEN_PORT || 3000;

// Endpoint /ping
app.get('/ping', (req: Request, res: Response) => {
    // Retourner les headers de la requête au format JSON
    res.json({ headers: req.headers });
});

// Middleware pour toutes les autres routes - doit être après les routes définies
app.use((req: Request, res: Response) => {
    res.status(404).send('');  // Réponse vide avec code 404
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});