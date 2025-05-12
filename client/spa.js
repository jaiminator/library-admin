const bookNav = document.getElementById("bookNav");
const memberNav = document.getElementById("memberNav");
const membersNav = document.getElementById("membersNav");
const getBooksDiv = document.getElementById("getBooks");
const newMemberDiv = document.getElementById("newMember");
const getMembersDiv = document.getElementById("getMembers");

const hideView = () => {
    getBooksDiv.classList.add("hide");
    newMemberDiv.classList.add("hide");
    getMembersDiv.classList.add("hide");
}

const goBooks = () => {
    hideView();
    getBooksDiv.classList.remove("hide");
}

const goNewMember = () => {
    hideView();
    newMemberDiv.classList.remove("hide");
}

const goMembers = () => {
    hideView();
    getMembersDiv.classList.remove("hide");
}

bookNav.addEventListener("click", goBooks);
memberNav.addEventListener("click", goNewMember);
membersNav.addEventListener("click", goMembers);
