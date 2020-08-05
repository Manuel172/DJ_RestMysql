"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySql {
    constructor() {
        this.conectado = false;
        console.log('inicio mysql');
        this.cnn = mysql_1.default.createConnection({
            host: 'localhost',
            //localAddress: '172.0.0.1',
            //port     : 3306,
            user: 'desa',
            password: 'desa',
            database: 'inventario',
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        // this.cnn  esta es parte de la clase y no puede verse a menos que sea por medio de la instancia
        this.instance.cnn.query(query, (error, results, fields) => {
            if (error) {
                console.log('Error en Query :', error);
                return callback(error);
            }
            if (results.length === 0) {
                callback('No existen registro para la consulta');
            }
            else {
                callback(null, results);
            }
        });
        this.instance.cnn.end();
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log('Error de Conexión: ', err);
                return;
            }
            this.conectado = true;
            console.log('Base de Datos Online');
        });
    }
}
exports.default = MySql;
