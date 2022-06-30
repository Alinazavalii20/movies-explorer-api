const express = require('express');

const { moviesPostValid, moviesDeleteValid } = require('../middlewares/validation');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

const moviesRouter = express.Router();

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', moviesPostValid, postMovie);

moviesRouter.delete('/movies/:movieId', moviesDeleteValid, deleteMovie);

module.exports = moviesRouter;
