
//musicaRoutes.js
const express = require('express');
const router = express.Router();
const musicaController =
require('../controllers/musicaControllers');
//Lembrando que a rota raiz tem a palavra musica, definido no app.js
// Rota para obter todos as músicas
router.get('/', musicaController.getAllMusicas);
// Rota para obter uma única música pelo ID
router.get('/:id', musicaController.getMusicasById);
// Rota para criar uma nova música 
router.post('/', musicaController.createMusica);
// Rota para atualizar uma música existente
router.put('/:id', musicaController.updateMusica);
// Rota para deletar uma música
router.delete('/:id', musicaController.deleteMusica);
module.exports = router;