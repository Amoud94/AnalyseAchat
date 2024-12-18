"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./db/connection"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const products_router_1 = __importDefault(require("./routes/products.router"));
const analytics_router_1 = __importDefault(require("./routes/analytics.router"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = (0, express_1.default)();
const options = {
    origin: ["http://localhost:5173"],
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Handle SPA routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
(0, connection_1.default)()
    .then(() => {
    app.use("/api/products", products_router_1.default);
    app.use("/api/analytics", analytics_router_1.default);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
