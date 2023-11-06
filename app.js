// Add DOM selectors to target input and UL movie list
let lastMovieList = []
if (localStorage["lastMovieList"]) {
    lastMovieList = JSON.parse(localStorage.getItem("lastMovieList"))
}
else {
    lastMovieList = []
}
var inp = document.querySelector("input");
var myMovieList = document.querySelector("ul");
var myMovieTable = document.querySelector("#movieHistoryCard")
let myMovies = {}
var tableCreated = false
if (localStorage["myMovies"]) {
    myMovies = JSON.parse(localStorage.getItem("myMovies"))
    for (var key in myMovies) {
        myMovies[key] = myMovies[key]
        inp.value = key
        addMovie()
        clearInput()
    }    
    tableCreated = true
}
else {
    myMovies = {}
}
function refreshAddMovieList() {
    myMovieList.innerHTML = ''
    for(let i of lastMovieList) {
        addMovieList(i)
    }
}
refreshAddMovieList()
// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
    localStorage["lastMovieList"] = []
    lastMovieList = []
}

function addMovieList(name) {
    var nameList = []
    for (let i of myMovieList.querySelectorAll("li")) {
        nameList.push(i.textContent.toLowerCase())
    }
    if (!(nameList.includes(name.toLowerCase()))) {
        // Step 2: Create an empty <li></li>
        var li = document.createElement("li"); // <li></li>
        li.style.listStyleType = "None"

        // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
        var textToInsert = document.createTextNode(name);

        // Step 4: Insert text into li
        // <li>Harry Potter </li>
        li.appendChild(textToInsert);

        // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
        myMovieList.appendChild(li);
    }
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;
    if(userTypedText === "") {
        alert("Movie can not be empty!")
    }
    else {
        if (!(Object.keys(myMovies).map(item => item.toLowerCase())).includes(userTypedText.toLowerCase()) || document.querySelectorAll("tr").length - 1 != Object.keys(myMovies).length) {
            addMovieList(userTypedText)
            // Step 6: Call the clearInput function to clear the input field
            clearInput();
      

            if (!tableCreated) {
                var table = document.createElement("table")
                table.style.width = "100%"
                var trForHeadings = document.createElement("tr")
                var thForName = document.createElement("th")
                var headName = document.createTextNode("Name")
                thForName.appendChild(headName)
                trForHeadings.appendChild(thForName)
                var thForWatchedTimes = document.createElement("th")
                var watched = document.createTextNode("Watched")
                thForWatchedTimes.appendChild(watched)
                trForHeadings.appendChild(thForWatchedTimes)
                table.appendChild(trForHeadings)
                tableCreated = true
            }
            var trForMovies = document.createElement("tr")
            var tdForMovieName = document.createElement("td")
            var tdForWatchedTimes = document.createElement("td")
            var movieName = document.createTextNode(userTypedText)
            tdForMovieName.appendChild(movieName)
            if (userTypedText in myMovies) {
                var times = myMovies[userTypedText]
            } else {
                var times = 1
            }
            var watchtedTimes = document.createTextNode(times)
            if (!isNaN(userTypedText.charAt(0))) {
                tdForWatchedTimes.setAttribute("id", "_" + userTypedText.toLowerCase().replace(/\s/g, '_'))
            } else {
                tdForWatchedTimes.setAttribute("id", userTypedText.toLowerCase().replace(/\s/g, '_'))
            }
            tdForWatchedTimes.appendChild(watchtedTimes)
            trForMovies.appendChild(tdForMovieName)
            trForMovies.appendChild(tdForWatchedTimes)

            if(!table) {
                var theTable = document.querySelector("table")
                theTable.appendChild(trForMovies)
                myMovieTable.appendChild(theTable)
            }
            else {
                table.appendChild(trForMovies)
                myMovieTable.append(table)
            }
            myMovies[userTypedText] = times
        }
        else {
            for(let key in myMovies) {
                if(key.toLowerCase() == userTypedText.toLowerCase()) {
                    myMovies[key] = myMovies[key] + 1
                    if (!isNaN(userTypedText.charAt(0))) {
                        document.querySelector(`#_${userTypedText.toLowerCase().replace(/\s/g, '_')}`).textContent = myMovies[key]
                    } else {
                        document.querySelector(`#${userTypedText.toLowerCase().replace(/\s/g, '_')}`).textContent = myMovies[key]
                    }
                }
            }
            addMovieList(userTypedText)
            clearInput()
        }
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
    }
}

var filterInput = document.querySelector("#filter")
filterInput.addEventListener("input", () => {
    var movieList = document.querySelectorAll("ul li")
    movieList.forEach((movie) => {
        if (!(movie.textContent.toLowerCase().includes(filterInput.value.toLowerCase())) && movie.textContent != "") {
            movie.style.display = "None"
        }
        else {
            movie.style.display = "Inline"
        }
    })
})


document.querySelector("button").addEventListener("click", () => {
	for(let i of document.querySelectorAll("ul li")) {
        if (!lastMovieList.map(item => item.toLowerCase()).includes(i.textContent.toLowerCase())) {
            lastMovieList.push(i.textContent)
        }
    } 
    localStorage.setItem("lastMovieList", JSON.stringify(lastMovieList))
})
// myMovieList.innerHTML = "<li>BCIT</li>"
// Object.keys(myMovies).map(el => `<li>${el}</li>`)

localStorage.clear()