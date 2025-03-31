import express, { Request, Response } from 'express';
import * as os from 'os';


const app = express();
const port = process.env.PING_LISTEN_PORT || 8080;

// Endpoint /ping
app.get('/ping', (req: Request, res: Response) => {
    console.log(`Request received on host: ${os.hostname()}`);
    // Retourner les headers de la requête au format JSON
    res.json({ headers: req.headers });
});

// Middleware pour toutes les autres routes - doit être après les routes définies
app.use((req: Request, res: Response) => {
    res.status(404).end();  // Réponse vide avec code 404
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur ${port}`);
});