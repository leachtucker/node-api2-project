/* IMPORTS */
const express = require('express');
const cors = require('cors');
const postRoutes = require('./posts/postRoutes');

/* SETUP */
const server = express();
server.use(cors());
server.use(express.json());

/* ROUTES */
server.use('/api/posts', postRoutes);

/* PROP SERVER */
server.listen(5000, () => console.log('API running on port 5000'));