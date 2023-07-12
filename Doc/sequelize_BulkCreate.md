# [**BulkCreate**][docBulk]

[`Model.bulkCreate`][docBulk] method to allow creating multiple records at once, with only one query **for only one table**.  
If you need to insert data with one record in multiple tables, it is better to use Create (and for of loop)

```js
const captains = await Captain.bulkCreate([
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' }
], { validate: bool, fields: string[] });
```

It's very similar to [`Model.create`][docCreate]

---

The main difference between the two ways (creating records one by one with `create` vs. using `bulkCreate`) is in performance and efficiency.

* If you are inserting only a few records, or if you need <ins>to do some specific processing or validation on each record before inserting it</ins>, creating one at a time with `create` may be more appropriate, as it gives you more control and flexibility.

* If you need to insert a large number of records efficiently and do not require individual manipulation of each record, `bulkCreate` is the recommended option. **It's especially useful when you are working with large volumes of data and performance is an important** consideration.

---

Examples:


<details>
  <summary>BulkCreate example *BEST for inserts multiple records in ONE table</summary>

  ```js
  async function crearCumplimiento(req, res) {
  const { cumplimiento } = req.body;

  try {
    // Iniciar transacción
    const transaction = await sequelize.transaction();

    // Crear el Cumplimiento
    const nuevoCumplimiento = await Cumplimiento.create(cumplimiento, { transaction });

    // Obtener el ID del Cumplimiento creado
    const cumplimientoId = nuevoCumplimiento.id;

    // Asociar el Cumplimiento con la CumpliDescription
    const cumpliDescriptionData = cumplimiento.cumpli_description;
    cumpliDescriptionData.cumplimientoId = cumplimientoId;
    const nuevaCumpliDescription = await CumpliDescription.create(cumpliDescriptionData, { transaction });

    // Asociar el CumpliDescription con las Jornadas
    const jornadasData = cumplimiento.cumpli_description.jornadas;

    // Agregar el cumpliDescId a cada objeto de jornadasData
    const jornadasDataWithIds = jornadasData.map(jornadaData => {
      jornadaData.cumpliDescId = nuevaCumpliDescription.id;
      return jornadaData;
    });

    // Crear las Jornadas utilizando bulkCreate
    await Jornadas.bulkCreate(jornadasDataWithIds, { transaction });

    // Confirmar la transacción
    await transaction.commit();

    // Enviar respuesta exitosa
    res.status(201).json({ message: 'Datos insertados correctamente' });
  } catch (error) {
    // Si ocurre un error, deshacer la transacción
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al insertar los datos' });
  }
}
  ```
</details>

 

<details>
  <summary>Create example 1</summary>

  ```js
  async function crearCumplimiento(req, res) {
  const { cumplimiento } = req.body;

  try {
    // Iniciar transacción
    const transaction = await sequelize.transaction();

    // Crear el Cumplimiento
    const nuevoCumplimiento = await Cumplimiento.create(cumplimiento, { transaction });

    // Obtener el ID del Cumplimiento creado
    const cumplimientoId = nuevoCumplimiento.id;

    // Asociar el Cumplimiento con la CumpliDescription
    const cumpliDescriptionData = cumplimiento.cumpli_description;
    cumpliDescriptionData.cumplimientoId = cumplimientoId;
    const nuevaCumpliDescription = await CumpliDescription.create(cumpliDescriptionData, { transaction });

    // Crear las Jornadas utilizando create
    const jornadasData = cumplimiento.cumpli_description.jornadas;
    const jornadasPromises = jornadasData.map(jornadaData => {
      jornadaData.cumpliDescId = nuevaCumpliDescription.id;
      return Jornadas.create(jornadaData, { transaction });
    });
    await Promise.all(jornadasPromises);

    // Confirmar la transacción
    await transaction.commit();

    // Enviar respuesta exitosa
    res.status(201).json({ message: 'Datos insertados correctamente' });
  } catch (error) {
    // Si ocurre un error, deshacer la transacción
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al insertar los datos' });
  }
}
  ```
</details>

<details>
  <summary>Create example 2 *BEST for inserts multiple records in many related tables</summary>

  ```js
  async function crearCumplimiento(req, res) {
  const cumplimientos = req.body;

  // Iniciar transacción
  const transaction = await SUGO_sequelize_connection.transaction();

  try {
      // Crear los Cumplimientos junto con CumpliDescriptions y Jornadas relacionadas
      const nuevosCumplimientos = [];
      for (const cumplimientoData of cumplimientos) {
          const nuevoCumplimiento = await Cumplimiento.create(cumplimientoData, {
              include: [{ model: CumpliDesc, include: [Jornadas] }],
              transaction,
          });
          nuevosCumplimientos.push(nuevoCumplimiento);
      }

      // Confirmar la transacción
      await transaction.commit();

      // Enviar respuesta exitosa con los Cumplimientos creados
      res.status(201).json({ message: 'Datos insertados correctamente', cumplimientos: nuevosCumplimientos });
  } catch (error) {
      // Si ocurre un error, deshacer la transacción
      await transaction.rollback();
      console.error('error in get one cumpli with desc controller', error);
      res.status(500).json({ error: `Ocurrió un error al insertar los datos: ${error.message}` });
  }
}
  ```
</details>


[docBulk]: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk
[docCreate]: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-insert-queries