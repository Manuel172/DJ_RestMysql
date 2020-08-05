
import mysql from "mysql";

export default class MySql {

        private static _instance: MySql;
        cnn: mysql.Connection;
        conectado: boolean = false;
        constructor() {
            console.log('inicio mysql');
            this.cnn = mysql.createConnection({
                host     : 'localhost',
                //localAddress: '172.0.0.1',
                //port     : 3306,
                user     : 'desa',
                password : 'desa',
                database : 'inventario',
                //insecureAuth : true
              });

            this.conectarDB();

        }

        public static get instance() {

            return this._instance || ( this._instance = new this())
        }

        static ejecutarQuery(query: string, callback: Function) {
            // this.cnn  esta es parte de la clase y no puede verse a menos que sea por medio de la instancia
            this.instance.cnn.query(query, (error, results: Object[], fields )=> {
                if (error) {
                    console.log('Error en Query :', error);
                    return callback(error);
                }

                if (results.length === 0) {
                    callback('No existen registro para la consulta');
                } else {
                    callback( null, results);
                }
                
            });


            this.instance.cnn.end();

        }

        private conectarDB() {
            this.cnn.connect( (err: mysql.MysqlError) => {
                if (err) {
                    console.log('Error de Conexión: ', err);
                    return;
                }

                this.conectado=true;
                console.log('Base de Datos Online');

            });
        }


}