let myLibrary = [
    {
        title: "ReLIFE",
        author: "Yayoi Sou",
        pages: 222,
        status: true
    },
    {
        title: "Solo leveling",
        author: "Jang Sung-Lak",
        pages: 110,
        status: true
    },
    {
        title: "Yotsuba to!",
        author: "Azuma Kiyohiko",
        pages: 105,
        status: false
    }
];

function Book(title, author, pages, status=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// Reads data from the form ands it to myLibrary
function addNewBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    // Converting the string value to boolean
    const status = document.querySelector('input[name="status"]:checked').value == "true" ? true : false;
    myLibrary.push(new Book(title, author, pages, status));
    render();
}

// Form submit event handler
document.querySelector(".add-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.querySelector(".add-form").style.display = "none";
    document.querySelector(".btn-add").style.display = "block";
    document.querySelector("form").reset();
    addNewBook();
});

// Returns "Read" or "Yet to read" button based on the input boolean
function checkCompleted(flag) {
    return flag ? "<button class='toggle read'>Read</button>" : 
            "<button class='toggle unread'>Yet to read</button>";
}

// Renders the table if myLibrary is not empty
function render() {
    if(myLibrary.length == 0)
        checkMyLibrary();
    else {
        const tbody = document.querySelector("#tbody");
        tbody.innerHTML = null;
        for(let i = 0; i < myLibrary.length; i++) {
            const tr = document.createElement("tr");
            tr.setAttribute("data-id", i);
            tr.innerHTML = `<td>${myLibrary[i].title}</td><td>${myLibrary[i].author}</td>
                    <td>${myLibrary[i].pages}</td><td>${checkCompleted(myLibrary[i].status)}</td>
                    <td><button class="btn-delete">Delete</button></td>`;
            tbody.appendChild(tr);
        }
    }
}
render();

// Hides the table if myLibrary is empty and displays a message
function checkMyLibrary() {
    if(myLibrary.length == 0) {
        document.querySelector(".table").style.display = "none";
        document.querySelector(".message").style.display = "block";
    } else {
        document.querySelector(".table").style.display = "block";
        document.querySelector(".message").style.display = "none";
    }
}

// Displays the hidden form to add new book
document.querySelector(".btn-add").addEventListener("click", function() {
    document.querySelector(".add-form").style.display = "block";
    document.querySelector(".btn-add").style.display = "none";
});

// Hides the form to add new book
document.querySelector(".btn-cancel").addEventListener("click", function() {
    document.querySelector(".add-form").style.display = "none";
    document.querySelector(".btn-add").style.display = "block";
    document.querySelector("form").reset();
});

document.querySelector("#tbody").addEventListener("click", function(e){
    const btn = e.target;

    // Toggle between "Read" or "Yet to read"
    if(btn.classList.contains("toggle")) {
        let currentRow = btn.parentNode.parentNode;
        let index = currentRow.getAttribute("data-id");
        myLibrary[index].status = !myLibrary[index].status;
        btn.classList.toggle("unread");
        btn.classList.toggle("read");
        if(btn.classList.contains("read"))
            btn.textContent = "Read";
        else
            btn.textContent = "Yet to read";
    }

    // Delete an entry
    else if(btn.classList.contains("btn-delete")) {
        let currentRow = btn.parentNode.parentNode;
        let index = currentRow.getAttribute("data-id");
        myLibrary.splice(index, 1);
        console.log(myLibrary);
        document.querySelector("#tbody").removeChild(currentRow);
        checkMyLibrary();
    }
});
