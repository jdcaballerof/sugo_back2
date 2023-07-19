import express from 'express'
import cumpliRoutes from './cumplimiento/routes/cumpli.routes.js';
import rolRoutes from './Rol/routes/rol.routes.js';


const app = express()

//& Middlewares
// Para poder leer los JSON del body 
app.use( express.json() )

//& Rutas
app.use(cumpliRoutes)
app.use(rolRoutes)

// app.use(cumplimientoRoutes)
// app.use(cumpliDescRoutes)
// app.use(jornadasRoutes)



export default app