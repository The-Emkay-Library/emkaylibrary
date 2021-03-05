-- Name: Kat Kime
-- Date: February 13, 2021
-- Description: Represents the SQL queries that will be used for CRUD
-- functionalities.


-- SECTION: Checkouts

-- PAGE: Checkout & Return Items
-- Checkout a new album
INSERT INTO Patrons_Albums (Album_ID, Patron_ID) VALUES (:album_id_input,
  :patron_id_input);
-- Checkout a new book
INSERT INTO Patrons_Books (Book_ID, Patron_ID) VALUES (:book_id_input,
  :patron_id_input);
-- Checkout a new movie
INSERT INTO Patrons_Movies (Movie_ID, Patron_ID) VALUES (:movie_id_input,
  :patron_id_input);
-- Return a checked-out album
DELETE FROM Patrons_Albums
WHERE Patron_ID = :patron_id_input AND Album_ID = :album_id_input;
-- Return a checked-out book
DELETE FROM Patrons_Books
WHERE Patron_ID = :patron_id_input AND Album_ID = :book_id_input;
-- Return a checked-out movie
DELETE FROM Patrons_Movies
WHERE Patron_ID = :patron_id_input AND Album_ID = :movie_id_input;


-- PAGE: Album Rentals
-- View all album rentals
SELECT Patrons.Patron_ID AS 'Patron ID', Albums.Album_ID As 'Album ID',
Patrons.First_name AS 'First Name', Patrons.Last_name AS 'Last Name',
Albums.Title AS 'Album Title'
FROM Patrons JOIN Patrons_Albums JOIN Albums;


-- PAGE: Book Rentals
-- View all book rentals
SELECT Patrons.Patron_ID AS 'Patron ID', Books.Book_ID As 'Book ID',
Patrons.First_name AS 'First Name', Patrons.Last_name AS 'Last Name',
Books.Title AS 'Book Title'
FROM Patrons JOIN Patrons_Books JOIN Books;


-- PAGE: Movie Rentals
-- View all movie rentals
SELECT Patrons.Patron_ID AS 'Patron ID', Movies.Movie_ID As 'Movie ID',
Patrons.First_name AS 'First Name', Patrons.Last_name AS 'Last Name',
Movies.Title AS 'Book Title'
FROM Patrons JOIN Patrons_Movies JOIN Movies;




-- SECTION: Items

-- PAGE: Albums
-- View all available albums
SELECT Albums.Album_ID, Artists.Artist_ID, Artists.First_name AS
'Artist First Name', Artists.Last_name AS 'Artist Last Name', Title
FROM Artists JOIN Albums;
-- Search albums by artist first name and artist last name
SELECT Albums.Album_ID, Artists.Artist_ID, Artists.First_name AS
'Artist First Name', Artists.Last_name AS 'Artist Last Name', Title
FROM Artists JOIN Albums
WHERE Artists.First_Name = :artist_first_name_input AND
Artists.Last_name = :artist_last_name_input;
-- Add a new album
INSERT INTO Albums (Artist_ID, Title) VALUES (:artist_id_input, :title_input);
-- Update an existing album
UPDATE Albums
SET Artist_ID = :artist_id_input
WHERE Albums.Album_ID= :album_id_input;
UPDATE Albums
SET Title = :title_input
WHERE Albums.Album_ID = :album_id_input;
-- Delete an existing album
DELETE FROM Albums
WHERE Album_ID = :album_id_input;


-- PAGE: Books
-- View all available books
SELECT Books.Book_ID, Artists.Artist_ID, Artists.First_name AS
'Artist First Name', Artists.Last_name AS 'Artist Last Name', Title
FROM Artists JOIN Books;
-- Search books by artist first name and artist last name
SELECT Books.Book_ID, Artists.Artist_ID, Artists.First_name AS
'Artist First Name', Artists.Last_name AS 'Artist Last Name', Title
FROM Artists JOIN Books
WHERE Artists.First_Name = :artist_first_name_input AND
Artists.Last_name = :artist_last_name_input;
-- Add a new book
INSERT INTO Books (Artist_ID, Title) VALUES (:artist_id_input, :title_input);
-- Update an existing book
UPDATE Books
SET Artist_ID = :artist_id_input
WHERE Books.Book_ID = :book_id_input;
UPDATE Books
SET Title = :title_input
WHERE Books.Book_ID = :book_id_input;
-- Delete an existing book
DELETE FROM Books
WHERE Book_ID = :book_id_input;


-- PAGE: Movies
-- View all available movies
SELECT Movies.Movie_ID, Artists.Artist_ID, Artists.First_name AS
'Artist First Name', Artists.Last_name AS 'Artist Last Name', Title
FROM Artists JOIN Movies;
-- Search movies by title
SELECT Movies.Movie_ID, Artists.Artist_ID, Artists.First_name AS
'Artist First Name', Artists.Last_name AS 'Artist Last Name', Title
FROM Artists JOIN Movies
WHERE Artists.First_Name = :artist_first_name_input AND
Artists.Last_name = :artist_last_name_input;
-- Add a new movie
INSERT INTO Movies (Artist_ID, Title) VALUES (:artist_id_input, :title_input);
-- Update an existing movie
UPDATE Movies
SET Artist_ID = :artist_id_input
WHERE Movies.Movie_ID = :movie_id_input;
UPDATE Movies
SET Title = :title_input
WHERE Movies.Movie_ID = :movie_id_input;
-- Delete an existing movie
DELETE FROM Movies
WHERE Movie_ID = :movie_id_input;




-- SECTION: Members

-- PAGE: Artists
-- View all artists
SELECT *
FROM Artists;
-- Search artists by last name
SELECT *
FROM Artists
WHERE Artists.Last_name = :artist_last_name_input;
-- Add a new artist
INSERT INTO Artists (First_name, Last_name) VALUES (:First_name_input,
  :Last_name_input);
-- Edit an exisitng artist
UPDATE Artists
SET First_Name = :artist_first_name_input
WHERE Artist_ID = :artist_id_input;
UPDATE Artists
SET Last_name = :artist_last_name_input
WHERE Artist_ID = :artist_id_input;
-- Delete an existing artist
DELETE FROM Artists
WHERE Artist_ID = :artist_id_input;


-- PAGE: Patrons
-- View all patrons
SELECT *
FROM Patrons;
-- Search patrons by last name
SELECT *
FROM Patrons
WHERE Patrons.Last_name = :patrons_last_name_input;
-- Add a new patron
INSERT INTO Patrons (First_name, Last_name, Email_address) VALUES (:First_name_input,
  :Last_name_input, :Email_address_input);
-- Edit an exisitng patron
UPDATE Patrons
SET First_Name = :patron_first_name_input
WHERE Patron_ID = :patron_id_input;
UPDATE Patrons
SET Last_name = :patrons_last_name_input
WHERE Patron_ID = :patron_id_input;
UPDATE Patrons
SET Email_address = :patron_email_address_input
WHERE Patron_ID = :patron_id_input;
-- Delete an existing patron
DELETE FROM Patrons
WHERE Patron_ID = :patron_id_input;
