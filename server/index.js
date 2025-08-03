const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Para permitir CORS
app.use(express.json()); // Para parsear JSON en el body

app.post('/api/validar-token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Si viene como "Bearer token"

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  if (token.length > 3) {
    return res.status(200).json({ message: 'Token válido' });
  } else {
    return res.status(401).json({ message: 'Token inválido (muy corto)' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
