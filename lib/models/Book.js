const pool = require('../utils/pool.js');

class Book {
  id;
  title;
  release;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
    this.genre = row.genre;
    this.authors = row.authors && row.authors;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((bookRow) => new Book(bookRow));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      select books.*,

      coalesce(
          json_agg(to_jsonb(authors))
          filter (WHERE authors.id IS NOT NULL), '[]') as authors
      from books
      left join authors_books on books.id = authors_books.book_id
      left join authors on authors.id = authors_books.author_id
      WHERE books.id = $1
      group by books.id
    `,
      [id]
    );
    return new Book(rows[0]);
  }
}
module.exports = { Book };
