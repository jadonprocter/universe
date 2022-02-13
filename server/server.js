require("dotenv").config(); // dot env
const cors = require("cors"); // prevent cors errors
const express = require("express"); // express
const bodyParser = require("body-parser"); // bodyParser to make sure JSON can be exchanged
const session = require("express-session"); // session tokens built in with express to log the gaming session
const passport = require("passport"); // used to authenticate with google
require("./auth"); // file import with all google authenticatino
const {
  insertUser,
  findUser,
  insertPlanet,
  findPlanet,
  getUsersPlanets,
  updateUserSession,
} = require("./mongo-database"); // file import to use functions to manipulate MongoDB
const randomNumber = require("./prng"); // pseudo-random number generator

/**
 * MIDDLEWARE
 */

// Checks if user is already logged in
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

function getPlanets(req, res, next) {
  const planets = getUsersPlanets(req.user.googleId);
  req.body.planets = planets;
  next();
}

/**
 *  INITIALIZE THE SERVER
 */

// initialize the app and start the express server
const app = express();
const PORT = 3001;

/**
 * APP DEPENDENCIES
 */

app.use(bodyParser.json()); // json body parser
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

/**
 * MAKING DIRECTORIES USABLE
 */
// app.use(express.static(path.join(__dirname, "../universe/dist")));

/**
 * ROUTES
 */

/**
 * MONGODB ROUTES
 */

app.post("/addPlanet", isLoggedIn, async (req, res) => {
  const result = await insertPlanet(req.body.planet, req.body.sessionID);
  // console.log(req);
  res.send(result);
});

/**
 * AUTH ROUTES
 */

// home route (login)
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">AUTHENTICATE</a>');
});

// protected route that uses middleware to check if the user is logged in. (auth end and MongoDB beginning ^^^)
app.get("/protected", isLoggedIn, getPlanets, async (req, res) => {
  const u = {
    name: req.user.displayName,
    googleId: req.user.id,
    username: req.user.displayName.replace(" ", "").toLowerCase(),
  };
  // console.log(req.sessionID);
  const exists = await findUser(u);
  if (exists === null) {
    u.session = req.sessionID;
    console.log();
    await insertUser(u);
  }
  const update = await updateUserSession(u, req.sessionID);
  console.log(update);
  res.redirect("http://localhost:3000");
});

// route that handles the failure to authenticate users
app.get("/auth/failure", (req, res) => {
  res.send("something went wrong...");
});

// route that handles the authentication initialization process
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// route that is called back to by google API
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })
);

// Logs user out, not implemented yet.
app.get("/logout", (req, res) => {
  req.logout();
  res.send("BYE BYE!");
});

// request a random number from the server.
app.get("/random", (req, res) => {
  res.send(randomNumber(req.body.lowerBound, req.body.upperBound));
});

/**
 * APP LISTEN
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
