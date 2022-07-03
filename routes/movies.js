const express = require('express');

const { moviesPostValid, moviesDeleteValid } = require('../middlewares/validation');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);

moviesRouter.post('/', moviesPostValid, postMovie);

moviesRouter.delete('/:movieId', moviesDeleteValid, deleteMovie);

module.exports = moviesRouter;
