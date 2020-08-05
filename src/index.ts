import Server from './server/server';
import router from './router/router';
import MySql from './mysql/mysql';

const server = Server.init( 3000 );

//usa archivo de rutas  (router/router.ts)
server.app.use( router);

//const mysql = new MySql();
//MySql.instance;

server.start( ()=>{
    console.log('Servidor en puerto 3000');
})