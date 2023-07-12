import express from 'express'
import cumpliRoutes from './routes/cumpli.routes.js';
import cumplimientoRoutes from './routes/cumpli/cumplimiento.routes.js';
import cumpliDescRoutes from './routes/cumpli/cumpli_desc.routes.js';
import jornadasRoutes from './routes/cumpli/desc_jornadas.routes.js';

const app = express()

//& Middlewares
// Para poder leer los JSON del body 
app.use( express.json() )

//& Rutas
app.use(cumpliRoutes)

app.use(cumplimientoRoutes)
app.use(cumpliDescRoutes)
app.use(jornadasRoutes)



export default app