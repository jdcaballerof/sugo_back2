import pg from 'pg';

import dotenv from 'dotenv'
dotenv.config()



/*
 &  Doc: https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
        option 3            
 #! No funciona la version de postgres del swap con sequelize       
    export const swap1Pool = new Sequelize( 
        process.env.DB_SWAP1_NAME ,            // 'database name', 
        process.env.DB_SWAP1_USER ,            // 'username', 
        process.env.DB_SWAP1_PASSWORD ,        // 'password', 
        {
            host: process.env.DB_SWAP1_HOST ,  // '10.10...',
            port: process.env.DB_SWAP1_PORT ,  // '5432',
            dialect: 'postgres',
        }
    )
*/


// export const swap1Pool = new pg.Client({
//     database:   process.env.DB_SWAP1_NAME,
//     user:       process.env.DB_SWAP1_USER,
//     password:   process.env.DB_SWAP1_PASSWORD,
//     host:       process.env.DB_SWAP1_HOST,
//     port:       process.env.DB_SWAP1_PORT,
// })

const swap1Pool = new pg.Pool({
    database:   process.env.DB_SWAP1_NAME,
    user:       process.env.DB_SWAP1_USER,
    password:   process.env.DB_SWAP1_PASSWORD,
    host:       process.env.DB_SWAP1_HOST,
    port:       process.env.DB_SWAP1_PORT
})


const swap2Pool = new pg.Pool({
    database:   process.env.DB_SWAP2_NAME,
    user:       process.env.DB_SWAP2_USER,
    password:   process.env.DB_SWAP2_PASSWORD,
    host:       process.env.DB_SWAP2_HOST,
    port:       process.env.DB_SWAP2_PORT
})

const swap3Pool = new pg.Pool({
    database:   process.env.DB_SWAP3_NAME,
    user:       process.env.DB_SWAP3_USER,
    password:   process.env.DB_SWAP3_PASSWORD,
    host:       process.env.DB_SWAP3_HOST,
    port:       process.env.DB_SWAP3_PORT
})

const swap4Pool = new pg.Pool({
    database:   process.env.DB_SWAP4_NAME,
    user:       process.env.DB_SWAP4_USER,
    password:   process.env.DB_SWAP4_PASSWORD,
    host:       process.env.DB_SWAP4_HOST,
    port:       process.env.DB_SWAP4_PORT
})

const swap5Pool = new pg.Pool({
    database:   process.env.DB_SWAP5_NAME,
    user:       process.env.DB_SWAP5_USER,
    password:   process.env.DB_SWAP5_PASSWORD,
    host:       process.env.DB_SWAP5_HOST,
    port:       process.env.DB_SWAP5_PORT
})

const swap6Pool = new pg.Pool({
    database:   process.env.DB_SWAP6_NAME,
    user:       process.env.DB_SWAP6_USER,
    password:   process.env.DB_SWAP6_PASSWORD,
    host:       process.env.DB_SWAP6_HOST,
    port:       process.env.DB_SWAP6_PORT
})

const swap7Pool = new pg.Pool({
    database:   process.env.DB_SWAP7_NAME,
    user:       process.env.DB_SWAP7_USER,
    password:   process.env.DB_SWAP7_PASSWORD,
    host:       process.env.DB_SWAP7_HOST,
    port:       process.env.DB_SWAP7_PORT
})

export const swaPools = [
    null,
    swap1Pool,
    swap2Pool,
    swap3Pool,
    swap4Pool,
    swap5Pool,
    swap6Pool,
    swap7Pool,
]

// module.exports = {
//     pool,
//     swaPools,
// }