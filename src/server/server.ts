import express = require('express');
import path = require('path');

export default class server {
    public app: express.Application;
    public port: number = 3000;

    constructor(puerto: number) {
        // inicializa la app
        this.port = puerto;
        this.app = express();
    }

    private publicFolder() {
       const publicPath = path.resolve(__dirname,'../public');
       this.app.use( express.static(publicPath) );
    }

    static init(puerto: number) {
        return new server( puerto );
    }

    start( callback: Function) {
        this.app.listen( this.port, callback());
        this.publicFolder();
    }
}
