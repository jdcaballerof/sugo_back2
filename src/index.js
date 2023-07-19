import app from "./app.js";
import { SUGO_sequelize_connection as sequelize } from "./database/sugo.connection.js";

import dotenv from 'dotenv'
dotenv.config()

/*
 &  Para sequelize.sync({ force: true })
      Aplicar cambios en los modelos de las tablas de la DB      */
  //^ Cumplimiento                                          
  // import './models/Cumpli.model.js';
  // import './models/CumpliDesc.model.js';
  // import './models/Jornadas.model.js';

  //^ Rol 
  // import './Rol/models/Header.model.js'
  // import './Rol/models/Servicio.model.js'

  // ^ Catalogos
  // import './catalogos/models/modalidades.js'

// // import './models/Tasks.js';


const PORT = process.env.APP_PORT


const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    /*
    & Sincronizar los cambios en los modelos a la DB   
    await sequelize.sync({ alter: true })
    */ 
    
    app.listen(PORT) 
    console.log('Server is listening in port: ' + PORT);

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}



main();