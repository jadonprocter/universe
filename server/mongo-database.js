require("dotenv").config();
const { MongoClient } = require("mongodb");

// CLIENT
const client = new MongoClient(process.env.MONGO_URL);

/**
 * CONNECTION FUNCTIONS
 */

// connect to DB
const connectDB = async () => {
  try {
    await client.connect();
    const db = await client.db(process.env.DB_NAME);
    return db;
  } catch (e) {
    console.error(e);
  }
};

const connectToCollection = async (coll) => {
  try {
    await connectDB();
    return await client.db(process.env.DB_NAME).collection(coll);
  } catch (e) {
    console.error(`Cannot connect to Users collection: ${e}`);
  }
};

/**
 *  USERS COLLECTION MANAGEMENT
 */

const updateUserSession = async (userObj, sessionID) => {
  try {
    const usersCollection = await connectToCollection("users");
    const result = await usersCollection.updateOne(userObj, {
      $set: { session: sessionID },
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};

const insertUser = async (userObj) => {
  try {
    const usersCollection = await connectToCollection("users");
    const result = await usersCollection.insertOne(userObj);
    return result;
  } catch (e) {
    console.error(e);
  }
};

const findUser = async (userObj) => {
  try {
    const usersCollection = await connectToCollection("users");
    const result = await usersCollection.findOne(userObj);
    // console.log(result);
    return result;
  } catch (e) {
    console.error(e);
  }
};

/**
 * PLANETS COLLECTION MANAGEMENT
 */

const getPlanetsUserID = async (session) => {
  try {
    const usersCollection = await connectToCollection("users");
    const userID = await usersCollection.findOne({ session: session });
    return userID._id;
  } catch (e) {
    console.error(e);
  }
};

const getUsersPlanets = async (id) => {
  try {
    // connect to the collections
    const planetsCollection = await connectToCollection("planets");
    const usersCollection = await connectToCollection("users");

    // get planets based on user
    const userID = await usersCollection.find({ googleId: id }, { _id });
    const planets = await planetsCollection.find({ userID: userID });

    //return planets
    console.log(planets);
    return planets;
  } catch (e) {
    console.error(e);
  }
};

const insertPlanet = async (planetObj, session) => {
  try {
    const planetsCollection = await connectToCollection("planets");
    const user = await getPlanetsUserID(session);
    planetObj.userID = user;
    const result = await planetsCollection.insertOne(planetObj);
    return result;
  } catch (e) {
    console.error(e);
  }
};

const findPlanet = async (planetObj) => {
  try {
    const planetsCollection = await connectToCollection("planets");
    const result = await planetsCollection.findOne(planetObj);
    return result;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  findUser,
  insertUser,
  insertPlanet,
  findPlanet,
  getUsersPlanets,
  updateUserSession,
};
