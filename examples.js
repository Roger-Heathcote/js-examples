// Client fetch with GET
// Client fetch with GET
// Client fetch with GET
js

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

// Fetch helper - query
// Fetch helper - query
// Fetch helper - query
js

function query(url, options) {
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      const error = new Error("HTTP Error");
      error.status = res.status;
      throw error;
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("json")) {
      return res.json();
    } else {
      return res.text();
    }
  });
}

export default query;

// Client fetch with POST
// Client fetch with POST
// Client fetch with POST
js

fetch("https://fac-dogs.herokuapp.com/v1/users",
    {
        "headers" : { "content-type": "application/json" }, 
        "body": JSON.stringify(yourObjectWotYouWantedPosting),
        "method": "POST" 
    })
    .then( dieIfResponeCodeNot200 )
    .then( decodeJSONOrDieTrying )
    .then( result => {
        console.log("The thing we wanted:", result.whatever );
    })
    .catch( err => console.error(`Bumflaps! there was an error: ${err.message}`)


// Server in vanilla node.js
// Server in vanilla node.js
// Server in vanilla node.js
js

const http = require("http");
const router = require("./router");
const server = http.createServer(router);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening at ${port}`));


// Router function in vanilla Node.js
// Router function in vanilla Node.js
// Router function in vanilla Node.js
js

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


// Public file server handler
// Public file server handler
// Public file server handler
js

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

// HTML Templates
html

<template id="template">
  <li class="item">
    <input class="item__text"> type="text"</input>
    <input class="item__checkbox" type="checkbox" value="wevs"></input>
  </li>  
</template>

// Template cloning and populating
// Template cloning and populating
// Template cloning and populating
js

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
js

function getAncestorIfItHasClass(elem, className){
    // Takes a DOM node (typically from event.target) and recursively checks up the
    // DOM tree til it finds a node with className. It then returns that node.
    if(elem.classList.contains(className)) return elem;
    if(elem.parentElement) return getAncestorIfItHasClass(elem.parentElement, className);
}

// Running GET tests with supertest
// Running GET tests with supertest
// Running GET tests with supertest
js

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

// Running POST tests with supertest
// Running POST tests with supertest
// Running POST tests with supertest
js

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

// Receive POST data in vanilla node
// Receive POST data in vanilla node
// Receive POST data in vanilla node
js

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
sql

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


// package.json scripts
// package.json scripts
// package.json scripts
json

  "scripts": {
    "dev": "nodemon workshop/server.js",
    "test": "PGDATABASE=test_node_postgres tape 'workshop/tests/*' | tap-spec",
    "watch": "nodemon -q -x 'npm test'"

// /database/build
// /database/build
// /database/build
js

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
js

const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config(); // load environment variables
const db = new pg.Pool(); // create a pool of available connections
module.exports = db; // export the pool for use elsewhere on our server

// example sql table definition / init.sql
// example sql table definition / init.sql
// example sql table definition / init.sql
sql

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
  ('Precand', 19, 'Stanton, UK')
;

INSERT INTO blog_posts (text_content, user_id) VALUES
  ('Announcing of invitation principles in.', 1),
  ('Aenean blandit risus sed pellentesque.', 5)
;

COMMIT;


// Database testing with tape
// Database testing with tape
// Database testing with tape
js

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

// zzz.test.js  -  Stop the 10s timeout at the end of db tests
// zzz.test.js  -  Stop the 10s timeout at the end of db tests
// zzz.test.js  -  Stop the 10s timeout at the end of db tests
js

const test = require("tape");
const db = require("../database/connection");

test("Dummy test, just want to close db connection!", t => {
        db.end();
        t.end();
});


// Getting which radio button is selected
// Getting which radio button is selected
// Getting which radio button is selected
js

button.addEventListener("click", () => {
  const checked = document.querySelector("[type='radio']:checked")
  const output = document.querySelector("output");
  output.textContent = "You checked: " + checked.id;
})


// Handling uncaught promise rejections in Node
// Handling uncaught promise rejections in Node
// Handling uncaught promise rejections in Node
js

// in server.js
process.on("unhandledRejection", error => {
  console.error(error);
  process.exit(1);
});

// Checking requset method in router
// Checking requset method in router
// Checking requset method in router
js

 } else if (req.url === "/blog" && req.method === "GET" ) {
     
     
// signUp.js with bcrypt
// signUp.js with bcrypt
// signUp.js with bcrypt
js

// Run npm install bcryptjs to install the library

const bcrypt = require("bcryptjs");

function post(request, response) {
  getBody(request)
    .then(body => {
      const user = new URLSearchParams(body);
      const email = user.get("email");
      const password = user.get("password");
+     bcrypt
+       .genSalt(10)
+       .then(salt => bcrypt.hash(password, salt))
+       .then(hash => model.createUser({ email, password: hash }))
        .then(() => {
          response.writeHead(200, { "content-type": "text/html" });
          response.end(`
            <h1>Thanks for signing up, ${email}</h1>
          `);
        })
        // .

        
// Log in with bcrypt
// Log in with bcrypt
// Log in with bcrypt
js

const bcrypt = require("bcryptjs");

function post(request, response) {
  getBody(request)
    .then(body => {
      const user = new URLSearchParams(body);
      const email = user.get("email");
      const password = user.get("password");
      model
        .getUser(email)
+       .then(dbUser => bcrypt.compare(password, dbUser.password))
+       .then(match => {
+         if (!match) throw new Error("Password mismatch");
          response.writeHead(200, { "content-type": "text/html" });
          response.end(`
            <h1>Welcome back, ${email}</h1>
          `);
        })
        // ...


// Cookies in raw node
// Cookies in raw node
// Cookies in raw node
js

res.setHeader('Set-Cookie', 'logged_in=true; HttpOnly; Max-Age=9000');
// OR
res.writeHead(200, { 'Set-Cookie': 'logged_in=true; HttpOnly; Max-Age=9000' });

Note: To send multiple cookie headers pass in an array of cookie strings
res.writeHead(200, { 'Set-Cookie': ['logged_in=true;', 'cat=persian; Secure'] });

// HttpOnly - prevent js from accessing cookie
// Secure - Only set over a HTTPS connection. Prevents MITM
// Max-Age	This sets the cookie lifetime in seconds.

// Reading cookie server side
req.headers.cookie; // 'logged_in=true'

// Delting a cookie
res.setHeader('Set-Cookie', 'logged_in=blah; Max-Age=0');

// There's also a res.cookie(name, val) that can be called multiple times to add cookies before res.send is called.
res.cookie("isStillHere" , 'yes it is !');
res.cookie("IP" , ip);
res.send('Cookies are set');
      
      
// Creating a JWT in node
// Creating a JWT in node
// Creating a JWT in node
js

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

claims = {
  one: 123,
  two: "456",
  three: { 7: "89" }
}
const cookie = jwt.sign(claims, secret);
response.writeHead(
  302, {
      'Location': '/',
      'Set-Cookie': `wevs=${cookie}; HttpOnly; Max-Age=20000`
  });
return response.end()


// Creating auth middleware to decode jwt in express for node
// Creating auth middleware to decode jwt in express for node
// Creating auth middleware to decode jwt in express for node
js

const cookieParser = require("cookie-parser");
server.use(cookieParser());

function authUser(req, res, next) {
  if(req.cookies.user) {
    try {
        req.user = jwt.verify(req.cookies.user, SECRET);
    }
    catch(err) {
        console.log("Bad token dude!", err);
    }
  }
  next();
}

server.use(authUser);

// Detecting if you're running in production or development
// Detecting if you're running in production or development
// Detecting if you're running in production or development
node

if(!process.env.NODE_ENV) {
  console.log("ERROR IN DEVELOPMENT");
  res.status(status).send(`<h1>${error.stack}</h1>`);


// Misc express.js methods
// Misc express.js methods
// Misc express.js methods
js

const cookieParser = require("cookie-parser");
server.use(express.urlencoded());
server.use(cookieParser());

res.cookie("user", token, { maxAge: 600000 });
res.clearCookie("user");
res.redirect("/profile");
res.status(401).send(`<h1>You need to login dude! <a href="/log-in">Login Page</a></h1>`);

function randomMiddleware(req, res, next) {
  console.log("Farts");
  next();
}
server.use(randomMiddleware);


// DB model tests
// DB model tests
// DB model tests
js

test("Check if getListing takes account of search term", t => {
  build().then( () => {
      let searchTerms = { search: "loads" };
      model.getListings(searchTerms).then( listings => {
          t.equal( listings.length, 2, "Exactly two listings returned" );
          t.equal( listings[0].id, 2, "First one has id 2" );
          t.equal( listings[0].title, "Loads of canned peas", "Post concerns peas" );
          t.equal( listings[1].id, 1, "Second has id 1" );
          t.equal( listings[1].username, "joe653", "Was posted by joe653" );
          t.end();
      })  
      .catch( err => {  console.log("SOMETHING'S UP!!!\n", err);   });
  })
});


// More DB model testing
// More DB model testing
// More DB model testing
js

test("Check if delete(1) deletes the correct thing!", t => {
  build().then( () => {
      model.deleteListing(1).then( () => {
          model.getOnlyPostsTable().then ( results => {
              t.equal( results.length, 3, "There should be only 3 results");
              results.forEach( item => { 
                  t.notEqual( item.id, 1, `ID ${item.id} not equal to 1`);
              });
              t.end();
          })
      })
  })
})

// Raw DOM Rendering helper function / module
// Raw DOM Rendering helper function / module
// Raw DOM Rendering helper function / module
js

function html(tag, props, ...children){
    const element = document.createElement(tag);
    const elementWithProps = Object.assign(element, props);
    elementWithProps.append(...children);
    return elementWithProps;
}

export default h;

// use

const container = document.getElementById("app");
const header = html("h1", {}, "Here are some dogs...");
const dogElements = dogs.map((dog) =>{
    const name = html("h3", {}, dog.name);
    const pic = html("img", { src: dog.image} );
    const li = html("li", {}, name, pic);
    return li;
});
const list = html("ul", {}, ...dogElements);
container.append(header, list);

// HTML data attribute
// HTML data attribute
// HTML data attribute
html

<a href="https://example.com" data-wevs="abc">Wevs</a>

function handleClick(event) {
    console.log( event.target.dataset.wevs )
    console.log( "wevs" in event.target.dataset )
}

// Getting ALL form fields
// Getting ALL form fields
// Getting ALL form fields
js

const formData = new FormData(event.target);
const formObject = Object.fromEntries(formData);

// Make a links clickable area as big as its parent wit a pseudo class
// Make a links clickable area as big as its parent wit a pseudo class
// Make a links clickable area as big as its parent wit a pseudo class
css

.task-five .card {
    position: relative;
}
.task-five .card a:after{
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

// ES6 Modules
// ES6 Modules
// ES6 Modules

// Default
export default add;
import add from "./maths.js"; // .js mandatory for localfiles

// Named
export {add, sub, div, mul};
import { add } from "./maths.js"; // .js mandatory for localfiles

// Hand rolled client side SPA router
// Hand rolled client side SPA router
// Hand rolled client side SPA router

function router() {
    let routes = {};

    function get(path, callback) {
        routes[path] = callback;
    }

    function setDefault(callback) {
        routes.default = callback
    }

    function redirect(path) {
        const url = window.location.origin + path;
        window.history.pushState(null, null, url);
        navigate(url);
    }

    function handleClick(event) {
        if (
          "external" in event.target.dataset ||
          event.button !== 0 ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.ctrlKey
        )
          return;
        if (event.target.tagName === "A") {
          event.preventDefault();
          window.history.pushState(null, null, event.target.href);
          navigate(event.target.href);
        }
      }

    function navigate(url) {
        const parsedUrl = new URL(url);
        const basePath = parsedUrl.pathname.split("?")[0];
        const callback = routes[basePath] || routes.default;
        callback({url: parsedUrl, redirect});
    }

    function redirect(path) {
        const url = window.location.origin + path;
        window.history.pushState(null, null, url);
        navigate(url);
    }


    function handlePop() {
        navigate(window.location);
    }

    function listen() {
        window.addEventListener("click", handleClick);
        window.addEventListener("popstate", handlePop);
        console.log(window.location);
        navigate(window.location);
    }

    function close() {
        window.removeEventListener("click", handleClick);
        window.removeEventListener("popstate", handlePop);
    }

    return {get, listen, close, setDefault};
}
export default router;


// Local storage
// Local storage
// Local storage

localStorage.setItem("user-id", result.user_id);
const token = localStorage.getItem("access-token");

// Defining and importing a React component with a controlled input
// Defining and importing a React component with a controlled input
// Defining and importing a React component with a controlled input

in file "Component.js"...
    import React from "react"
    const Component = (props) => {
        return (
            <span>{props.someText}</span>
            <input
                value={props.value}
                onChange={props.inputHandler}>
            </input>
        )
    }
    export default Component

in file "App.js"...
    import React from "react"
    import ReactDOM from "react-dom";
    import Component from "./Component"
    function App() {
      const [inputText, setInputText] = React.useState("default");
      const handleInputChanges = (event) => setInputText(event.target.value)
      return (
        <Component
          someText="Hello World"
          inputHandler={ handleInputChanges }
        />
      )
    }
    ReactDOM.render(<App />, document.getElementById("root"));


// React controlled checkbox component...
// React controlled checkbox component...
// React controlled checkbox component...

const Form = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={event => setChecked(event.target.checked)}
    />
  );
};

// React controlled radio buttons
// React controlled radio buttons
// React controlled radio buttons

const Form = () => {
  const [fruit, setFruit] = React.useState("apple");
  const handleChange = event => setFruit(event.target.value);
  return (
    <form>
      <input
        type="radio"
        name="fruit" // name groups the inputs
        value="apple"
        checked={fruit === "apple"}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="fruit"
        value="orange"
        checked={fruit === "orange"}
        onChange={handleChange}
      />


// React update based on previous state
// React update based on previous state
// React update based on previous state

const [count, setCount] = React.useState(7)
setCount( prev => prev+1 )

// React useEffect to add and remove / cleanup global event listeners
// React useEffect to add and remove / cleanup global event listeners
// React useEffect to add and remove / cleanup global event listeners
react

const Counter = props => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "ArrowUp") setCount(prevCount => prevCount + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <div>Count is {count}</div>;
};

// React async fetching data
// React async fetching data
// React async fetching data

import React from "react";
const [data, setData] = React.useState(null);

const getData = username => {
  return fetch(`https://api.github.com/users/${username}?access_token=${token}`)
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch getUserData failed ${err}`);
    });
};
React.useEffect( ()=>{
    getData("wevs").then(data => setData(data));
}, []);

if (!data) return(null) // Or a loading indicator
return(
  <p>{data}<p/>
)

// React rendering lists of stuff
// React rendering lists of stuff
// React rendering lists of stuff

return (
  <ul>
    {repos.map(repo => (
      <Repo key={repo.id} {...repo} /> // don't forget key
    ))}
  </ul>
);

// React testing async code
// React testing async code
// React testing async code

test("Async code", () => {
  // RETURN A PROMISE!!! DO NOT FORGET RETURN
  return fetch("http://test").then((res) => {
    expect(res.ok).toBeTruthy();
  });
});

// React adding test watcher to package.json
// React adding test watcher to package.json
// React adding test watcher to package.json

"test": "jest --watch"

// React jest assertions
// React jest assertions
// React jest assertions

expect(x).toBeTruthy();
expect(x).toBeFalsy();
expect(x).toEqual(y);

// Testing React components with React Testing Library (RTL) (which includes jsdom)
// Testing React components with React Testing Library (RTL) (which includes jsdom)
// Testing React components with React Testing Library (RTL) (which includes jsdom)

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("The button renders", () => {
  render(<Button>click me</Button>);
  const buttonNode = screen.getByText("click me"); // <button>click me</button>;
  fireEvent.click(buttonNode);
  screen.getByText("just clicked"); // the same button node with updated text
  // getByText will fail the test if it can't find an element with matching text
});

// Mocking out a fetch request / API in React / Jest
// Mocking out a fetch request / API in React / Jest
// Mocking out a fetch request / API in React / Jest

const mockResponse = `<h2 id="h2">This is a H2</h2>`
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ text: () => Promise.resolve(mockResponse) }),
  )

test('Check component displays right thing', () => {
  render(<p>Some stuff that triggers a fetch</p>)
  expect(global.fetch).toHaveBeenCalledTimes(1)
  return screen.findByText('This is a H2', { selector: 'h2' })
  </snip>
})

// Mocking an API server side / node
// Mocking an API server side / node
// Mocking an API server side / node

const mocks = nock("https://some-api.com");
mocks.get("/dogs/123").reply(200, { name: "Pongo" });

// Mocks must match exactly
// Mocks only work once, need to define for every use

