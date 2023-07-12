# Consumir app

## Cumplimiento 

Se tienen los siguientes servicios para el "Cumplimiento del servicio": 

<details>
  <summary>GET</summary>

  path: `api/cumpli`  
  path: `api/cumpli/:id`

  Retorna: 
  `Cumplimiento | Cumplimiento[]` 

  ```TS
    export interface Cumplimiento {
        id:                 number;
        porcentaje:         string;
        cumplidos:          number;
        tipo:               string;     // Catalogo
        serial:             number;
        fecha:              Date;
        modulo:             number;
        cumpli_description: CumpliDescription;
    }

    export interface CumpliDescription {
        id:             number;
        ruta:           string;         // Catalogo
        modalidad:      string;         // Catalogo
        cumplimientoId: number;         // Fk - Cumplimiento
        jornadas:       Jornada[];
    }

    export interface Jornada {
        id:           number;
        cred:         number;
        hrIni:        Date;
        hrFin:        Date;
        lugIni:       string;           // Catalogo *¹
        lugFin:       string;           // Catalogo *¹
        cumpliDescId: number;           // Fk - cumpliDesc
    }
  ```

</details>

<details>
  <summary>POST</summary>

  path: `api/cumpli`

  Mandar por body: `POSTCumpli[]`  

  Retorna: `{ message, Cumplimiento[] }`

  ```TS
    export interface POSTCumpli {
        porcentaje:         number;
        cumplidos:          number;
        tipo:               string;     // Catalogo *¹
        serial:             number;
        fecha:              Date;
        modulo:             number;
        cumpli_description: CumpliDescription;
    }

    export interface CumpliDescription {
        ruta:      string;              // Catalogo *¹
        modalidad: string;              // Catalogo *¹
        jornadas:  Jornada[];
    }

    export interface Jornada {
        cred:   number;
        hrIni:  string;
        hrFin:  string;
        lugIni: string;                 // Catalogo *¹ *²
        lugFin: string;                 // Catalogo *¹ *²
    }
  ```

</details>

<details>
  <summary>DELETE</summary>

  path: `api/cumpli/:id `

  Retorna:
  `{ "message", "Registros eliminados correctamente: id[]" }`

  Elimina el cumplimineto con su descripción (desc y jornadas)


</details>

## Planeacion del servicio