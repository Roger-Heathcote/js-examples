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
    
    
// EXAMPLE SQL QUERIES
// EXAMPLE SQL QUERIES
// EXAMPLE SQL QUERIES

SELECT first_name FROM users;
SELECT first_name FROM users WHERE id = 1;
SELECT first_name FROM users WHERE id = 1 OR id = 2;
SELECT text_content FROM blog_posts WHERE text_content LIKE '%fudge%';
SELECT text_content FROM blog_posts WHERE text_content LIKE '%Ro_ger%';
SELECT first_name FROM users WHERE id IN (1, 2);
SELECT id, CASE WHEN age > 12 AND age < 20 THEN true ELSE false END AS teenager FROM users;
INSERT INTO users (username, first_name) VALUES ('roger', 'rog');
UPDATE users SET first_name = 'rog' WHERE username = 'roger';

//INNER JOIN only returns rows where both tables have an entry
SELECT users.username, blog_posts.text_content FROM users INNER JOIN blog_posts ON users.id = blog_posts.user_id;

// LEFT JOIN returns all rows that have a value in the left table, whether they have one in the right one or not
SELECT users.username, blog_posts.text_content FROM users LEFT JOIN blog_posts ON users.id = blog_posts.user_id;

// Privileges - remember to switch to the right db iwht \c <dbname> first!
GRANT ALL PRIVILEGES ON DATABASE learn_node_postgres TO myuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
GRANT ALL ON SEQUENCE users_id_seq TO myuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;


// package.json
// package.json
// package.json

  "scripts": {
    "dev": "nodemon workshop/server.js",
    "test": "PGDATABASE=test_node_postgres tape 'workshop/tests/*' | tap-spec",
    "watch": "nodemon -q -x 'npm test'"

// /database/build
// /database/build
// /database/build
    
const fs = require("fs");
const path = require("path");
const db = require("./connection");
const initPath = path.join(__dirname, "init.sql");
const initSQL = fs.readFileSync(initPath, "utf-8");
const build = () => db.query(initSQL);
module.exports = build;

// /database/connection.js
// /database/connection.js
// /database/connection.js

const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config(); // load environment variables
const db = new pg.Pool(); // create a pool of available connections
module.exports = db; // export the pool for use elsewhere on our server

// /database/init.sql
// /database/init.sql
// /database/init.sql

BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age INTEGER,
  location VARCHAR(255)
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT
);

INSERT INTO users (username, age, location) VALUES
  ('Sery1976', 28, 'Middlehill, UK'),
  ('Notne1991', 36, 'Sunipol, UK'),
  ('Moull1990', 41, 'Wanlip, UK'),
  ('Spont1935', 72, 'Saxilby, UK'),
  ('Precand', 19, 'Stanton, UK')
;

INSERT INTO blog_posts (text_content, user_id) VALUES
  ('Announcing of invitation principles in.', 1),
  ('Peculiar trifling absolute and wandered yet.', 2),
  ('Far stairs now coming bed oppose hunted become his.', 3),
  ('Curabitur arcu quam, imperdiet ac orci ac.', 4),
  ('Aenean blandit risus sed pellentesque.', 5)
;

COMMIT;


// /tests/model.test.js
// /tests/model.test.js
// /tests/model.test.js

const test = require("tape");
const build = require("../database/build");
const { getUsers, createUser, getPosts } = require("../model");

test("Can get all users", t => {
    build().then(() => {
        getUsers()
        .then(users => {
            const firstUser = users[0];
            t.equal(firstUser.username, "Sery1976", "firstUser.username === 'Sery1976'");
            t.equal(firstUser.age, 28, "firstUser.age === 28");
            t.end();
        })
        .catch( err => {
            t.error(error);
            t.end();
        });
    });
});

test("Can create a new user", t => {
    build()
    .then(() => {
        const data = { username: "roger", age: 44, location: "London" };
        createUser(data)
        .then(getUsers)
        .then(users => {
            const latestUser = users[users.length - 1];
            t.equal(latestUser.username, "roger", "latestUser.username should equal 'roger'");
            t.end();
        })
        .catch(error => {
            t.error(error);
            t.end();
        });
      });
});





// /tests/zzz.test.js  -  Stop the 10s timeout at the end of db tests
// /tests/zzz.test.js  -  Stop the 10s timeout at the end of db tests
// /tests/zzz.test.js  -  Stop the 10s timeout at the end of db tests

const test = require("tape");
const db = require("../database/connection");

test("Dummy test, just want to close db connection!", t => {
        db.end();
        t.end();
});


// Handlers - all in one file with database access
// Handlers - all in one file with database access
// Handlers - all in one file with database access

const db = require("./database/connection");
const model = require("./model");

function home(request, response) {
  model.getUsers().then(users => {
    // const users = result.rows;
    // create a list item for each user in the array
    const userList = users.map(user => `<li>${user.username}</li>`);
    response.writeHead(200, { "content-type": "text/html" });
    // use .join to turn the array into a string
    response.end(`<ul>${userList.join("")}</ul>`);
  });
}

function newUser(request, response) {
  response.writeHead(200, { "content-type": "text/html" });
  response.end(`
    <form action="create-user" method="POST">
      <label for="username">Username</label>
      <input id="username" name="username">
      <label for="age">Age</label>
      <input id="age" name="age" type="number">
      <label for="location">Location</label>
      <input id="location" name="location">
      <button type="submit">Create user</button>
    </form>
  `);
}

function createUser(request, response) {
  let body = "";
  request.on("data", chunk => (body += chunk));
  request.on("end", () => {
    const searchParams = new URLSearchParams(body);
    const data = Object.fromEntries(searchParams);
    // const values = [data.username, data.age, data.location];
    model.createUser(data)
      .then(() => {
        response.writeHead(302, { location: "/" });
        response.end();
      })
      .catch(error => {
        console.log("THERE WAS AN ERROR!!!", error);
        response.writeHead(500, { "content-type": "text/html" });
        response.end(`<h1>Something went wrong saving your data</h1>`, error);
      });
  });
}

function allPosts(request, response) {
  model.allPosts()
  .then(posts => {
    // const posts = result.rows;
    const postsList = posts.map(
      post => `
      <li>
        <p>${post.text_content}</p>
        <div>${post.username}</p>
      </li>
    `
    );
    response.writeHead(200, { "content-type": "text/html" });
    response.end(`<ul>${postsList.join("")}</ul>`);
  });
}

module.exports = { home, newUser, createUser, allPosts };


// Getting which radio button is selected
// Getting which radio button is selected
// Getting which radio button is selected

button.addEventListener("click", () => {
  const checked = document.querySelector("[type='radio']:checked")
  const output = document.querySelector("output");
  output.textContent = "You checked: " + checked.id;
})


// Handling uncaught promise rejections in Node
// Handling uncaught promise rejections in Node
// Handling uncaught promise rejections in Node

// in server.js
process.on("unhandledRejection", error => {
  console.error(error);
  process.exit(1);
});

