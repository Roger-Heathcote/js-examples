// Client fetch
// Client fetch
// Client fetch

function dieIfBadResponse(response) {
    if (!response.ok) throw new Error("Response not OK");
    return response
}

let decodeJSON = res => res.json;

function fetchSomething(searchString, callback, errorHandler){
    console.log("Searching API for ", searchString);
    initOptions = { headers : {'Authtoken':'3X5BkCsjR5Rd5TfElUk7Oj'} }
    fetch(`https://example.com/search?$${searchString}`, initOptions)
    .then(dieIfBadResponse)  // the object fetch returns should have a property .ok
    .then(decodeJSON)        // we need to run the .json() method on the raw object
    .then(callback)          // we need to call the callback with the object we received
    .catch(errorHandler);    // we need to do something with any errors objects we get
}


// Server in vanilla node.js
// Server in vanilla node.js
// Server in vanilla node.js

const http = require("http");
const router = require("./router");
const server = http.createServer(router);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening at ${port}`));


// Router function in vanilla Node.js
// Router function in vanilla Node.js
// Router function in vanilla Node.js

const homeHandler = require("./handlers/home");
const publicHandler = require("./handlers/public");
const missingHandler = require("./handlers/missing");

function router(request, response) {
  const url = request.url;
  if (url === "/") {
    homeHandler(request, response);
  } else if (url.includes("public")) {
    publicHandler(request, response);
  } else {
    missingHandler(request, response);
  }
}

module.exports = router;


// Public file server route
// Public file server route
// Public file server route

const fs = require("fs");
const path = require("path");

const types = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpeg",
    ico: "image/x-icon",
 };

function publicHandler(request, response) {
  let pathBits = request.url.split("/");
  let extension = pathBits[pathBits.length-1].split(".")[1]; //TODO robustness
  let newPath = path.join(__dirname, "..", ...pathBits);
  fs.readFile(newPath, (error, file) => {
    if (error) {
        response.writeHead(404, { "content-type": "text/html" });
        response.end("<h1>404 : File not found</h1>");
    } else {
      let headers = types[extension] ? { "content-type": types[extension] } : {};
      response.writeHead(200, headers);
      response.end(file);
    }
  });
}

module.exports = publicHandler;

// Template cloning and populating
// Template cloning and populating
// Template cloning and populating

function addTask(priority, text, checkBox){
    
    let template = document.getElementById('cardTemplate');
    let newTask = template.content.cloneNode(true);
    let thePriority = newTask.querySelector(".to-do-list__card__priority");
    thePriority.classList.add(priority);
    let theText = newTask.querySelector(".to-do-list__card__text");
    theText.textContent = text;
    let theStatus = newTask.querySelector(".to-do-list__card__checkbox");
    theStatus.checked = checkBox;
    
    // If user clicks on the text it should re-open in the edit window
    theText.addEventListener("click", editHandler);

    // If user checks the checkbox the task is moved to the done list
    theStatus.addEventListener("click", checkboxHandler);

    toDoList.appendChild(newTask);
}

// Get ancestor container
// Get ancestor container
// Get ancestor container

function getAncestorIfItHasClass(elem, className){
    // recursively check up the family tree for specific className and return that node
    if(elem.classList.contains(className)) return elem;
    if(elem.parentElement) return getAncestorIfItHasClass(elem.parentElement, className);
}

// Running tests with supertest
// Running tests with supertest
// Running tests with supertest

// GET
// GET
// GET

test("Get blog route, status should be 200, body is an array encoded as json", t => {
    supertest(router)
    .get("/blog")
    .expect(200)
    .expect("content-type", "application/json")
    .end( (err, res) => {
        t.error(err);
        t.equal(res.text, JSON.stringify(["cat", "dog", "bird"]));
        t.end();
    });
});

// POST
// POST
// POST

test("Receive blog, status should be 200 and body is ['a', 'b']" , t => {
    supertest(router)
    .post("/blog")
    .send(['a', 'b'])
    .set("Authorization", "123") //sends a request header to the server
    .expect(200)
    .expect("content-type", "application/json")
    .end( (err, res) => {
        t.error(err);
        t.equal(res.text, JSON.stringify(["a", "b"]));
        t.end();
    });
});

