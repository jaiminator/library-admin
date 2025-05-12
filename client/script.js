// CLIENTE BIBLIOTECARIO
const BASE_URL = "http://localhost:8000";

const booksContainer = document.getElementById("booksContainer");
const btnGetBooks = document.getElementById("btnGetBooks");
const btnCreateMember = document.getElementById("btnCreateMember");

const inputName = document.getElementById("inputName");
const inputUser = document.getElementById("inputUser");
const inputPass = document.getElementById("inputPass");

const getBooks = () => {
  fetch(BASE_URL + "/books")
  .then((res) => res.json())
  .then((data) => {
    booksContainer.innerHTML = "";
    data.forEach(book => {
      const {id, title, description, author, publication_year, ISBN} = book;
      booksContainer.innerHTML += `<p>
      ${id}
      ${title}
      ${description}
      ${author}
      ${publication_year}
      ${ISBN}
      </p>`;
    });
    
  })
}

const newMember = () => {
  const nameToCreate = inputName.value;
  const userToCreate = inputUser.value;
  const passToCreate = inputPass.value;

  fetch(BASE_URL + "/register", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: nameToCreate,
      username: userToCreate,
      password: passToCreate
    }),
  }).then(() => {
    inputName.value = "";
    inputUser.value = "";
    inputPass.value = "";
    alert("Member registed");
  })
  .catch(() => {
    alert("Error to register member");
  });
};

btnGetBooks.addEventListener("click", getBooks);
btnCreateMember.addEventListener("click", newMember);