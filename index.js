
/*
// PASO 1
Primero, vamos a modificar la BBDD para que no se puedan insertar entries 
repetidas por título (Hay que alterar algo en la tabla)

ALTER TABLE entries
ADD CONSTRAINT unique_title UNIQUE (title);

Modificar la query SQL para que me devuelva una respuesta con los 
datos del autor y sin ID de la entry:
SELECT e.title, e.content, e.date, e.category, a.name, a.surname, a.image
FROM entries AS e
INNER JOIN authors AS a
ON e.id_author = a.id_author;

instalar nodemon:
npm install --save-dev nodemon 
*/

// codigo de Servidor
const express = require('express') //importamos paquete express
const app = express() // inicializar servidor con express
const port = 3000 // puerto a usar por el server

// express
app.use(express.json()); // Middleware para parsear el body de las peticiones

// GET http://localhost:3000
app.get('/', (req, res) => {
    res.send('Hello Entries y Authors!');
});

// importamos los archivos de rutas para entries
const entriesRoutes = require("./routes/entries.routes"); 
app.use('/api/entries', entriesRoutes);

// importamos los archivos de rutas para authors
const authorsRoutes = require("./routes/authors.routes");
app.use('/api/authors', authorsRoutes);

// Para todo el resto de rutas no contempladas
app.use('*', (req, res) => {
    res.status(404).send("Pagina no encontrada");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});