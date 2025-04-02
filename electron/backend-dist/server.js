"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
exports.initializeDatabase = initializeDatabase;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const data_source_1 = require("./data-source");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const crearAdmin_1 = __importDefault(require("./utils/crearAdmin"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = 3001;
exports.PORT = PORT;
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
app.use("/auth", authRoutes_1.default);
// Ajusta la ruta para servir la UI exportada de Next.js
const staticDir = path_1.default.join(__dirname, '..', '..', 'front', 'out'); // Sube dos niveles para llegar a la raíz
app.use(express_1.default.static(staticDir));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(staticDir, 'index.html'));
});
/**
 * Función para inicializar la conexión a la base de datos.
 */
console.log("Entidades registradas:", data_source_1.AppDataSource.options.entities);
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield data_source_1.AppDataSource.initialize();
            console.log('📦 Conectado a SQLite');
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
        }
    });
}
initializeDatabase().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, crearAdmin_1.default)(); // ✅ Ahora sí podés usar await
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}))
    .catch((error) => {
    console.error("❌ Falló la inicialización de la base de datos:", error);
});
