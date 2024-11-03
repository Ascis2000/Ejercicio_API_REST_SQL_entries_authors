
const { Pool } = require('pg');
const queries = require('../queries/entries.queries') // Queries SQL

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    database: 'postgres',
    password: '123456'
  });

// GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createEntry,[title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// UPDATE
const updateEntry = async (updatedEntry, originalTitle) => {
    const { title, content, category } = updatedEntry; //son los campos que podremos actualizar desde postman
    let client, result;

    try { //parametros para la query SQL 
        client = await pool.connect(); //$1 $2 $3 $4
        const data = await client.query(queries.updateEntry, [title, content, category, originalTitle]);
        result = data.rowCount; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error updating entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE
const deleteEntry = async (entry) => {
    const { title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexión
        const data = await client.query(queries.deleteEntry, [title]);
        result = data.rowCount; // rowCount indica el número de filas eliminadas
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Libera conexión solo si fue inicializada
    }
    return result;
};

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry
}

module.exports = entries;


// Pruebas

// llamada de prueba
 getEntriesByEmail("guillermu@thebridgeschool.es")
.then(data=>console.log(data))

// obtener todos los datos
/* getAllEntries()
.then(data=>console.log(data)) */

/* let newEntry = {
    title: "Se acabaron las mandarinas de TB",
    content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
    email: "guillermu@thebridgeschool.es",
    category: "sucesos"
}

createEntry(newEntry)
    .then(data => console.log(data)) */