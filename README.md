# SUGO BACKEND

## Servicios

Para el [cumplimiento][ser]: 
- GET
- POST
- DELETE

Para la planeación del servicio: 
- GET
- POST
- DELETE


## Modelado de datos ([relacion de tablas][lucidApp_SUGO])

![Relacion de tablas](./Doc/assets/MER%20SUGO%20cumplimiento.png "assets\MER SUGO servicios.png")
<center> <i> 1 cumplimiento tiene 1 descripcion, 1 desc tiene muchas jornadas </i> </center>

ㅤ

![Relacion de tablas](./Doc/assets/MER%20SUGO%20servicios.png "assets\MER SUGO servicios.png")
<center> <i> 1 header tienen muchos servicios </i> </center>

## Routes
*Empeza en este orden*

1. cumpli
2. cumpli_desc
3. desc_jornadas







[lucidApp_SUGO]: https://lucid.app/lucidchart/35b43b0b-0ef7-4755-b7aa-2853da78c7c4/edit?from_internal=true

[ser]: src\readme.md