const bookNav = document.getElementById("bookNav");
const memberNav = document.getElementById("memberNav");
const getBooksDiv = document.getElementById("getBooks");
const newMemberDiv = document.getElementById("newMember");

const goBooks = () => {
    newMemberDiv.classList.add("hide");
    getBooksDiv.classList.remove("hide");
}

const goMember = () => {
    newMemberDiv.classList.remove("hide");
    getBooksDiv.classList.add("hide");
}

bookNav.addEventListener("click", goBooks);
memberNav.addEventListener("click", goMember);

