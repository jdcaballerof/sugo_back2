## Post header and services
POST `[api] /api/rol`

Body:

```JSON
{
    "header": {
        "modulo": 5,
        "ruta_id": "107n",
        "modalidad_id": "n",
        "periodo_id": "5"
    },
    "servicios": [
      {
        "servicio": 21,
        "turno": 1,
        "dia": "2023-03-13",
        "eco": 1525,
        "cred": 11171,
        "hr_ini": "06:15",
        "hr_fin": "14:55",
        "lug_ini": "CCP",
        "lug_fin": "BAL",
        "tipo_id": "0",
        "estado_op_id": "0"
      }, {...}
    ]
  }
```


<details>
  <summary>OLD</summary>

  path: `api/cumpli/:id `

  Body:

  ```JSON
{
  "modulo": 5,
  "ruta_id": "10x",
  "modalidad_id": "x",
  "periodo_id": "5",
  "rol_servicios": [
    {
      "servicio": 11,
      "turno": 1,
      "dia": "2023-03-13",
      "eco": 1525,
      "cred": 11171,
      "hr_ini": "06:15",
      "hr_fin": "14:55",
      "lug_ini": "CCP",
      "lug_fin": "BAL",
      "tipo_id": "0",
      "estado_op_id": "0"
    }, {...}
  ]
}
```

</details>