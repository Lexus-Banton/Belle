const pool = require('../utils/pool.js');

module.exports = class Author {
  id;
  name;
  date_of_birth;
  place_of_birth;
  books;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.date_of_birth = row.date_of_birth;
    this.place_of_birth = row.place_of_birth;
    this.books = row.books;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name from authors');
    return rows.map((authorRow) => new Author(authorRow));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
      select authors.*,

      coalesce(
          json_agg(to_jsonb(books))
          filter (WHERE books.id IS NOT NULL), '[]') as books
      from authors
      left join authors_books on authors.id = authors_books.author_id
      left join books on books.id = authors_books.book_id
      WHERE authors.id = $1
      group by authors.id
      `,
      [id]
    );
    return new Author(rows[0]);
  }
};
