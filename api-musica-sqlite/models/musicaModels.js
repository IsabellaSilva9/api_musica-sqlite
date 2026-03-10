//música.js
const sqlite3 = require("sqlite3").verbose();
const dbPath = "./infra/database.db";
// Função para abrir conexão com o banco de dados
function openDbConnection() {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao abrir o banco de dados:", err.message);
    }
  });
  return db;
}
// Função para buscar todos as musicas
function getAllMusicas(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM musicas", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}
// Função para buscar um musica por ID
function getMusicasById(id_musicas, callback) {
  const db = openDbConnection();
  db.get("SELECT * FROM musicas WHERE id_musicas = ?", [id_musicas], (err, row) => {
    db.close();
    callback(err, row);
  });
}
// Função para criar um novo musica
function createMusica(musica, callback) {
  const { nome_musica, autor, genero, data_lanc } = musica;
  const db = openDbConnection();
  db.run(
    "INSERT INTO musicas (nome_musica, autor, genero, data_lanc) VALUES(?, ?, ?, ?)",
    [nome_musica, autor, genero, data_lanc],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    },
  );
}
// Função para atualizar um musica existente
function updateMusica(id_musicas, musica, callback) {
  const { nome_musica, autor, genero, data_lanc } = musica;
  const db = openDbConnection();
  db.run(
    "UPDATE musicas SET nome_musica = ?, autor = ?, genero = ?, data_lanc= ? WHERE id_musicas = ?",
    [nome_musica, autor, genero, data_lanc, id_musicas],
    function (err) {
      db.close();
      callback(err, { changes: this.changes });
    },
  );
} // Função para deletar um musica
function deleteMusica(id_musicas, callback) {
  const db = openDbConnection();
  db.run("DELETE FROM musicas WHERE id_musicas = ?", [id_musicas], function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}
module.exports = {
  getAllMusicas,
  getMusicasById,
  createMusica,
  updateMusica,
  deleteMusica,
};
