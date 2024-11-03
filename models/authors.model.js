
const { Pool } = require('pg');
const queries = require('../queries/authors.queries') // Queries SQL

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432', //por defecto 5432
    database: 'postgres',
    password: '123456'
  });

// GET
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET AUTHOR BY EMAIL
// http://localhost:3000/api/authors/email?email=alvaru@thebridgeschool.es
const getAuthorByEmail = async (email) => {
        let client, result;
        try {
            client = await pool.connect(); // Espera a abrir conexion
            const data = await client.query(queries.getAuthorByEmail, [email])
            result = data.rows; //devuelve las rows que corresponden al criterio email, en este caso rowcount nos devuelve 1, ya que solo hay un autor con ese email.
            
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            client.release();
        }
        return result
    }

// // CREATE AUTHOR
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;

    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[name, surname, image, email])
        result = data.rowCount //numero (Count) de autores creados
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


// //UPDATE
const updateAuthorByEmail = async (updatedAuthor, currentEmail) => {
    const { name, surname, image, email } = updatedAuthor;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateAuthorByEmail, [name, surname, image, email, currentEmail]);
        result = data.rows; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error updating entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const deleteAuthorByEmail = async (authorToDelete) => {
    const email = authorToDelete;
    let client, result;
    
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteAuthorByEmail, [email]);
        result = data.rowCount
        
    } catch (err) {
        console.log('Error deleting entry:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const authors = {
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthorByEmail,
    deleteAuthorByEmail
    
}
module.exports = authors;