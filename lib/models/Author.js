const pool = require('../utils/pool.js');

module.exports = class Author {
  id;
  name;
  date_of_birth;
  place_of_birth;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.date_of_birth = row.date_of_birth;
    this.place_of_birth = row.place_of_birth;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT id, name from authors');
    return rows.map((authorRow) => new Author(authorRow));
  }
  //   static async getById(id) {
  //     const { rows } = await pool.query(
  //       `
  //       select books.*,

  //       coalesce(
  //           json_agg(to_jsonb(authors))
  //           filter (WHERE authors.id IS NOT NULL), '[]') as authors
  //       from books
  //       left join authors_books on books.id = authors_books.book_id
  //       left join authors on authors.id = authors_books.author_id
  //       WHERE books.id = $1
  //       group by books.id
  //     `,
  //       [id]
  //     );
  //     return new Book(rows[0]);
  //   }
};
