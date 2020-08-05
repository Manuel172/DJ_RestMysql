"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class server {
    constructor(puerto) {
        this.port = 3000;
        // inicializa la app
        this.port = puerto;
        this.app = express();
    }
    publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    static init(puerto) {
        return new server(puerto);
    }
    start(callback) {
        this.app.listen(this.port, callback());
        this.publicFolder();
    }
}
exports.default = server;
