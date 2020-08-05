"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = `
        SELECT idClientes, rut, dv, nombre, apellidopat, apellidomat 
        FROM clientes`;
    mysql_1.default.ejecutarQuery(query, (err, clientes, campos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                clientes: clientes
            });
        }
    });
});
router.get('/heroes/:id', (req, res) => {
    const id = req.params.id;
    const escapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `
    SELECT idClientes, rut, dv, nombre, apellidopat, apellidomat 
    FROM clientes where idClientes = ${escapeId}`;
    mysql_1.default.ejecutarQuery(query, (err, clientes, campos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                clientes: clientes
            });
        }
    });
});
exports.default = router;
