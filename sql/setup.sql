-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists books CASCADE;
DROP table if exists authors CASCADE;
DROP table if exists authors_books;

CREATE table books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    release INT NOT NULL,
    genre VARCHAR NOT NULL
);

INSERT INTO books (title, release, genre) VALUES
('The Raven', 1845, 'lyrical narrative poem'),
('Frankenstein', 1818, 'Horror'),
('The Vanished Half', 2020, 'Historical Fiction'),
('Impulse', 2008, 'Young Adult'),
('Uglies', 2005, 'Science Fiction'),
('Specials', 2011, 'Science Fiction'),
('Marked', 2007, 'Paranormal Romance'),
('Lirael', 2001, 'Fantasy');

CREATE table authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    date_of_birth VARCHAR NOT NULL,
     place_of_birth VARCHAR NOT NULL
    );

    INSERT INTO authors ( name, date_of_birth, place_of_birth) VALUES
    ('Scott Westerfield', 'May 6, 1963', 'Dallas'),
    ('Garth Nix', 'July 19, 1963', 'Melbourne'),
    ('P.C. Cast', 'April 30, 1960', 'Wataseka' ),
    ('Ellen Hopkins', 'March 26, 1955', 'Long Beach'),
    ('Edgar Allen Poe', 'January 19, 1809', 'Boston' ),
    ('Brit Bennett', 'Unknown', 'Oceanside'),
    ('Mary Shelly', 'August 30, 1797', 'London');

    CREATE TABLE authors_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT,
    book_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
    );

    INSERT INTO authors_books (book_id, author_id)
    VALUES
    (1,5),
    (2,7),
    (3,6),
    (4,4),
    (5,1),
    (6,1),
    (7,3),
    (8,2);

 
