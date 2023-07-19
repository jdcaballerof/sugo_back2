import pg from 'pg';
import { swaPools } from '../../database/swap.connection.js';

/* indice = [
    getReporteGeneral

]*/

const exRegFecha = /^\d{2}\/\d{2}\/\d{4}$/;     // Formato: dd/mm/yyyy


const peticionBaseRepGnrl = `
    SELECT
        T.tarjeta_cve,
        to_char(T.tarjeta_fecha,'DD-MM-YYYY') AS fecha,
        T.tarjeta_eco AS eco,
        T.tarjeta_eco_ptr AS postura,
        T.tarjeta_op AS cred_op,
        T.tarjeta_turno AS turno,
        to_char(T.tarjeta_hr_ini_pst,'HH24:MI') AS hr_presentacion,
        to_char(T.tarjeta_hr_tmn_jnd,'HH24:MI') AS hr_termino,
        to_char(T.tarjeta_hr_almt_ini,'HH24:MI') AS hr_alimento1,
        to_char(T.tarjeta_hr_almt_fin,'HH24:MI') AS hr_alimento2,
        R.ruta_nombre,
        R.ruta_trayecto
    FROM
        op_tarjeta T
    INNER JOIN op_ruta R ON (T.tarjeta_ruta=R.ruta_cve_sist)
    INNER JOIN modulo M ON (T.mod_clave=M.mod_clave)
`


/**
 * @param {number} mod 1-7
 * @param {string} fechas 01/02/2023-15/02/2023
 * @returns array de 
 */
export const getReporteGeneral = async(mod, fechas) => {
    
    const [f0, f1] =  (!!fechas && typeof fechas == 'string') ? fechas.split('-') : ['01/02/2023','02/02/2023']
    const fechaIni  = exRegFecha.test( f0 ) ? f0 : '01/02/2023'
    const fechaFin  = !f1 ? f0 : exRegFecha.test( f1 ) ? f1 : '02/02/2023'

    try {
        const result = await swaPools[mod].query(`
        ${peticionBaseRepGnrl}
        WHERE
            (T.mod_clave=$1) AND
            (R.mod_clave=$1) AND
            (M.mod_clave=$1) AND
            (T.tarjeta_fecha BETWEEN $2 and $3) 
        ORDER BY
            T.tarjeta_fecha,
            T.tarjeta_eco,
            T.tarjeta_turno,
            T.tarjeta_hr_ini_pst
    `, [mod, fechaIni, fechaFin]) 

        return result.rows
        
    } catch (error) {
        console.log(error);
        return error;
    }
}