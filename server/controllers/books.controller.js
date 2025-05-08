const Book = require("../models/Book");

const getBooks = (req, res) => {
    res.send("Test list books");
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