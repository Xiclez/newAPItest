const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database "ulsa"
mongoose.connect('mongodb+srv://ibarraorvil:Sooth0212@cluster0.dh71ixn.mongodb.net/ulsa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch((err) => {
  console.error('Error de conexión a MongoDB:', err);
});

// Define the schema for the collection "ceiit"
const registroSchema = new mongoose.Schema({
  NOMBRE: String,
  Lugar: String,
  isAvailable: Boolean
}, { collection: 'ceiit' });

const Registro = mongoose.model('Registro', registroSchema);

app.get('/registros', async (req, res) => {
    try {
      console.log('Recibida solicitud para /registros');
      
      if (req.query.id) {
        console.log('Se recibió un ID en la consulta:', req.query.id);
        const registro = await Registro.findById(req.query.id);
        console.log('Registro encontrado:', registro);
        res.json(registro);
      } else {
        console.log('No se recibió ningún ID en la consulta, buscando todos los registros');
        const registros = await Registro.find();
        console.log('Registros encontrados:', registros);
        res.json(registros);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ message: error.message });
    }
  });

app.get('/', async (req, res) => {
    try {
      console.log('Recibida solicitud para /');
      const registros = await Registro.find();
      console.log('Registros encontrados:', registros);
      res.json(registros);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ message: error.message });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
