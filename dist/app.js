"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Sakin's Library");
});
app.use((req, res) => {
    res.status(404).json('Webpage does not exist');
});
app.use((error, req, res) => {
    if (error) {
        console.log(error);
        res.status(400).json({ message: "something went wrong from global error handler", error });
    }
});
exports.default = app;
