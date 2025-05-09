const Book = require("../models/Book");

const getBooks = async (req, res) => {
    const books = await Book.findAll();
    res.status(200).send(books);
}

const createBook = async (req, res) => {
    const createdBook = await Book.create({
        title: "Cinco semanas en globo",
        description: "Hola",
        author: "anonymous",
        publication_year: 1965,
        stock: 7
    });
    res.send(`Book ${createdBook.id} created`);
}

exports.getBooks = getBooks;
exports.createBook = createBook;