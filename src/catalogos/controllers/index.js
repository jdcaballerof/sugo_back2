import { catalogo_modalidad } from "../models/modalidades.js";

const createReg = async() => {
    
    try {
        await catalogo_modalidad.bulkCreate([
            { desc: 'ordinario' },
            {cve: 'x', desc: 'expreso' },
            {cve: 'm', desc: 'atenea' },
            {cve: 'e', desc: 'ecobus' },
            {cve: 'd', desc: 'expreso directo' },
            {cve: 'n', desc: 'nochebus' },
        ])
    } catch (error) {
        console.log(error);
    }
}

