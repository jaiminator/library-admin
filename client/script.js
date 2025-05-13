// CLIENTE BIBLIOTECARIO
const BASE_URL = "http://localhost:8000";

const booksContainer = document.getElementById("booksContainer");
const btnGetBooks = document.getElementById("btnGetBooks");

const membersContainer = document.getElementById("membersContainer");
const btnGetMembers = document.getElementById("btnGetMembers");

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
  });
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

const getMembers = () => {
  fetch(BASE_URL + "/members")
  .then((res) => res.json())
  .then((data) => {
    membersContainer.innerHTML = "";
    data.forEach(member => {
      const {id, name, registration_date, createdAt, updatedAt, user, password} = member;
      membersContainer.innerHTML += `<p>
      ${id}
      ${name}
      ${registration_date}
      ${createdAt}
      ${updatedAt}
      ${user}
      ${password}
      </p>`;
    });
  });
}

btnGetBooks.addEventListener("click", getBooks);
btnGetMembers.addEventListener("click", getMembers);
btnCreateMember.addEventListener("click", newMember);