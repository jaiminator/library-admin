// CLIENTE BIBLIOTECARIO
const BASE_URL = "http://localhost:8000";

const booksContainer = document.getElementById("booksContainer");
const btnGetBooks = document.getElementById("btnGetBooks");

const getBooks = () => {
  fetch(BASE_URL + "/books")
  .then((res) => res.json())
  .then((data) => {
    booksContainer.innerHTML = "";
    data.forEach(book => {
      const {id, title, description, author, publication_year} = book;
      booksContainer.innerHTML += `<p>
      ${id}
      ${title}
      ${description}
      ${author}
      ${publication_year}
      </p>`;
    });
    
  })
}

btnGetBooks.addEventListener("click", getBooks);