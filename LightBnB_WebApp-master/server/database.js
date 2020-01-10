const properties = require('./json/properties.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Userscscs
/**
* Get a single user from the database given their email.
* @param {String} email The email of the user.
* @return {Promise<{}>} A promise to the user.
*/
const getUserWithEmail = function(email) {
  return pool.query('SELECT * FROM users WHERE email = $1', [email]).then(res => res.rows[0]);
};
exports.getUserWithEmail = getUserWithEmail;
/**
* Get a single user from the database given their id.
* @param {string} id The id of the user.
* @return {Promise<{}>} A promise to the user.
*/
const getUserWithId = function(id) {
  return pool.query('SELECT * FROM users WHERE id = $1', [id]).then(res => res.rows[0]);
};
exports.getUserWithId = getUserWithId;
/**
* Add a new user to the database.
* @param {{name: string, password: string, email: string}} user
* @return {Promise<{}>} A promise to the user.
*/
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users(name, password, email) VALUES($1, $2, $3)
  RETURNING *;
  `, [user.name, user.password, user.email]).then(res => res.rows[0]);
};
exports.addUser = addUser;
/// Reservations
/**
* Get all reservations for a single user.
* @param {string} guest_id The id of the user.
* @return {Promise<[{}]>} A promise to the reservations.
*/
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT * FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN  property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  LIMIT $2`, [guest_id, limit]).then(res => res.rows);
};
exports.getAllReservations = getAllReservations;
/// Properties
/**
* Get all properties.
* @param {{}} options An object containing query options.
* @param {*} limit The number of results to return.
* @return {Promise<[{}]>}  A promise to the properties.
*/
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`city LIKE '%${options.city}%'`);
  }

  if (options.owner_id) {
    queryParams.push(`owner_id = ${options.owner_id}`);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`cost_per_night > ${options.minimum_price_per_night}`);
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`cost_per_night < ${options.maximum_price_per_night}`);
  }

  if (options.minimum_rating) {
    queryParams.push(`property_reviews.rating > ${options.minimum_rating}`);
  }

  if (queryParams.length > 0) {
    queryString += `WHERE ${queryParams.join(' AND ')} `;

  }

  // 4
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT ${limit};
  `;

  // 5
  console.log(queryString);

  // 6
  return pool.query(queryString)
    .then(res => res.rows);
};

exports.getAllProperties = getAllProperties;
/**
* Add a property to the database
* @param {{}} property An object containing all of the property details.
* @return {Promise<{}>} A promise to the property.
*/
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;