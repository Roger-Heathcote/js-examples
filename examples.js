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
    initOptions = { headers : {'some-token':'3X5BkCsjR5Rd5TfElUk7Oj'} }
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
  let extension = pathBits[pathBits.length-1].split(".")[1] || "";
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

function addItem(text, checkBox){    
    let template = document.getElementById('template');
    let newItem = template.content.cloneNode(true);
    newItem.querySelector(".item__text") = text;
    let itemCheckBox = newItem.querySelector(".item__checkbox");
    itemCheckBox.checked = checkBox;
    itemCheckBox.addEventListener("click", checkBoxHandler);
    toDoList.appendChild(newItem);
}

// Get ancestor container
// Get ancestor container
// Get ancestor container

function getAncestorIfItHasClass(elem, className){
    // Takes a DOM node (typically from event.target) and recursively checks up the
    // DOM tree til it finds a node with className. It then returns that node.
    if(elem.classList.contains(className)) return elem;
    if(elem.parentElement) return getAncestorIfItHasClass(elem.parentElement, className);
}

// Running tests with supertest
// Running tests with supertest
// Running tests with supertest

// GET
// GET
// GET

test("Test GET route description", t => {
    supertest(router)
    .get("/the-route-name")
    .expect(200)
    .expect("content-type", "application/json")
    .end( (err, res) => {
        t.error(err);
        t.equal(res.text, JSON.stringify(["some", "json", "data"]));
        t.end();
    });
});

// POST
// POST
// POST

test("Test POST route description" , t => {
    supertest(router)
    .post("/the-route-name")
    .send(['some', 'post', 'data']) // some serializable javascript object
    .set("some-header", "some value") //sends a request header to the server
    .expect(200)
    .expect("content-type", "application/json")
    .end( (err, res) => {
        t.error(err);
        t.equal(res.text, JSON.stringify(['some', 'post', 'data']));
        t.end();
    });
});

// Receive POST data
// Receive POST data
// Receive POST data

let data = "";
req.on("data", dat=>data+=dat);
req.on("error", console.error);
req.on("end", _ =>{
    if(data.length){
        // Do something with data
        res.writeHead(200, {"content-type": "application/json" });
        res.end(JSON.stringify(data));
    } else {
        res.writeHead(302, {"location": "/blog" });
        res.end(JSON.stringify({"location": "/blog" }));
    }
