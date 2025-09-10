const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const app = express();
app.use(cors());


// Inicializar Firebase
app.use(express.json());

const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Rutas
const db = admin.firestore();

app.get("/clientes/EqHZF0KnXdF4ibkB7EJF", (req, res) => { //Ruta GET
  res.send("Servidor corriendo Firebase");});

  // Crear documento usuario
app.post("/clientes/EqHZF0KnXdF4ibkB7EJF", async (req, res) => { //Ruta POST
  try {
    const { nombre, email, telefono } = req.body;    
    // Agregar documento a la colección "usuarios"   
    const docRef = await db.collection("clientes").add({ email, nombre, telefono }); 
    res.json({ id: docRef.id, message: "Cliente agregado" });  
    } 
    catch (error) {
    res.status(500).json({ error: error.message });  
    }
});

// Obtener datos de los documentos
app.get("/clientes/EqHZF0KnXdF4ibkB7EJF", async (req, res) => {
  try {
    const items = await db.collection("clientes").get();

    const usuarios = items.docs.map(doc => { // Mapear documentos a un array de objetos
      const data = doc.data();
      return {
        id: doc.id,
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono
      };
    });

    res.json(usuarios); // Enviar array de usuarios como respuesta en JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conexión al servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));