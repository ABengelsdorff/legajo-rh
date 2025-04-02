import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes';
import authRoutes from "./routes/authRoutes";
import crearAdminSiNoExiste from './utils/crearAdmin';

const app: Express = express();
const PORT = 3001;


app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());
app.use('/users', userRoutes);
app.use("/auth", authRoutes);


// Ajusta la ruta para servir la UI exportada de Next.js
const staticDir = path.join(__dirname, '..', '..', 'front', 'out'); // Sube dos niveles para llegar a la raíz
app.use(express.static(staticDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

/**
 * Función para inicializar la conexión a la base de datos.
 */
console.log("Entidades registradas:", AppDataSource.options.entities);

export async function initializeDatabase(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('📦 Conectado a SQLite');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}

// Exporta la app y la función de inicialización
export { app, PORT };

initializeDatabase().then(async () => {
  await crearAdminSiNoExiste(); // ✅ Ahora sí podés usar await
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
})
.catch((error) => {
  console.error("❌ Falló la inicialización de la base de datos:", error);
});


