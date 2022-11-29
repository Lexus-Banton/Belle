const pool = require('../utils/pool.js');

module.exports = class Book {
  id;
  name;
  release;
  genre;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.release = row.release;
    this.genre = row.genre;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((bookRow) => new Book(bookRow));
  }
};
