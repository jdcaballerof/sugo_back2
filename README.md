# SUGO BACKEND

## Modelado de datos ([relacion de tablas][lucidApp_SUGO])

### Cumplimiento
![Relacion de tablas](./Doc/assets/MER%20SUGO%20cumplimiento.png "assets\MER SUGO servicios.png")
<center> <i> 1 cumplimiento tiene 1 descripcion, 1 desc tiene muchas jornadas </i> </center>

ㅤ
### Rol
![Relacion de tablas](./Doc/assets/MER%20SUGO%20servicios.png "assets\MER SUGO servicios.png")
<center> <i> 1 header tienen muchos servicios </i> </center>


## Project Structure
```js
.  
├── package.json  
├── requests    (How to use the API: request methods, params, body, etc. )  
│   ├── projects.http  
│   └── tasks.http  
├── sql ( sequelize methods in sql ) *optional  
│   └── db.sql  
└── src  
    ├── app1: Cumplimiento
    │    ├── models  
    │    │   ├── Cumpli.model.js  
    │    │   ├── Cumpli_desc.model.js
    │    │   └── Desc_jornadas.model.js
    │    ├── services   
    │    │   ├── (sequelize) *optional
    │    │   └── ...
    │    ├── controllers  
    │    │   ├── cumplimiento.controller.js  
    │    │   ├── cumpli.controller.js  
    │    │   ├── cumpli_desc.controller.js  
    │    │   └── desc_jornadas.controller.js  
    │    ├── routes
    │    │   ├── cumplimiento.routes.js
    │    │   ├── cumpli.routes.js
    │    │   ├── cumpli_desc.routes.js
    │    │   └── desc_jornadas.routes.js
    │    └── ...
    │  
    ├── app2: Rol
    │    ├── models  
    │    │   ├── Header.model.js  
    │    │   └── Servicio.model.js
    │    ├── services   
    │    │   ├── (sequelize) *optional  
    │    │   └── ...
    │    ├── controllers  
    │    │   ├── rol.controller.js  
    │    │   ├── header.controller.js  
    │    │   └── servicio.controller.js  
    │    ├── routes
    │    │   ├── rol.routes.js
    │    │   ├── header.routes.js
    │    │   └── servicio.routes.js
    │    └── ...
    │  
    ├── database  
    │   └── database.js  
    ├── app.js  
    └── index.js  
```

> models, controllers y routes hijos de src son de la app cumplimiento

:joy:


## Services

Para el [cumplimiento][ser]: 
- GET
- POST
- DELETE

Para la planeación del servicio: 
- GET
- POST
- DELETE





[lucidApp_SUGO]: https://lucid.app/lucidchart/35b43b0b-0ef7-4755-b7aa-2853da78c7c4/edit?from_internal=true

[ser]: src\readme.md