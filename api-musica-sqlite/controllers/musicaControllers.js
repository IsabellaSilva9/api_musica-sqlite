//musicaController.js
const Musica = require("../models/musicaModels");
// Controlador para obter todos as musicas
exports.getAllMusicas = (req, res) => {
  Musica.getAllMusicas((err, musicas) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(musicas);
    }
  });
};
// Controlador para obter uma música pelo ID
exports.getMusicasById = (req, res) => {
  Musica.getMusicasById(req.params.id, (err, Musica) => {
    if (err) {
      res.status(500).send(err);
    } else if (Musica) {
      res.json(Musica);
    } else {
      res.status(404).send({ message: "Musica não encontrado" });
    }
  });
};
// Controlador para criar uma nova música
exports.createMusica = (req, res) => {
  Musica.createMusica(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(result);
    }
  });
};
// Controlador para atualizar um música existente
exports.updateMusica = (req, res) => {
  Musica.updateMusica(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.changes) {
      res.status(200).json(result);
    } else {
      res.status(404).send({ message: "Música não encontrada" });
    }
  });
};
// Controlador para deletar uma música
exports.deleteMusica = (req, res) => {
  Musica.deleteMusica(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.changes) {
      res.status(200).json({ message: "Música deletada com sucesso" });
    } else {
      res.status(404).send({ message: "Musica não encontrada" });
    }
  });
};
