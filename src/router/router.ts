import {Router, Response, Request, response} from 'express';
import MySql from '../mysql/mysql';


const router =  Router();

router.get('/heroes', (req: Request, res: Response) => {
    const query = `
        SELECT idClientes, rut, dv, nombre, apellidopat, apellidomat 
        FROM clientes`;

    MySql.ejecutarQuery( query, (err: any, clientes: Object[], campos:any) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok:true,
                clientes: clientes
            })
        }
    });

});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;
    const escapeId = MySql.instance.cnn.escape(id);

    const query = `
    SELECT idClientes, rut, dv, nombre, apellidopat, apellidomat 
    FROM clientes where idClientes = ${ escapeId }`;

    MySql.ejecutarQuery( query, (err: any, clientes: Object[], campos:any) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok:true,
                clientes: clientes
            })
        }
    });

});
export default router;