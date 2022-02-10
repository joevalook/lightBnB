const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1;`, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        return null
      }
      else {
        return result.rows[0]
      }
    })
    .catch((err) => {
      return (err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      return (err.message);
    });
};
exports.getUserWithId = getUserWithId;
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser = (userObj) => {
  return pool
    .query(`
    INSERT INTO users(name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `, [userObj.name, userObj.email, userObj.password])
    .then((result) => result.rows[0])
    .catch((err) => {
      return (err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }

const getAllReservations = (guest_id, limit = 10) => {
  return pool
    .query(`SELECT * FROM reservations 
    JOIN properties ON properties.id = property_id
     WHERE guest_id = $1 LIMIT $2;`, [guest_id, limit])
    .then((result) => result.rows)
    .catch((err) => {
      return (err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    options.city = options.city.charAt(0).toUpperCase() + options.city.slice(1).toLowerCase();
    queryParams.push(`%${options.city}%`);
    if (queryString.length < 150){
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    else {
      queryString += `AND city LIKE $${queryParams.length} `;
    }
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryString.length < 150){
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
    else {
      queryString += `AND owner_id = $${queryParams.length} `;
    }
  }
  if (options.minimum_price_per_night) {
    options.minimum_price_per_night *= 100;
    queryParams.push(`${options.minimum_price_per_night}`);
    if (queryString.length < 150){
      queryString += `WHERE cost_per_night > $${queryParams.length} `;
    }
    else {
      queryString += `AND cost_per_night > $${queryParams.length} `;
    }
  }
  if (options.maximum_price_per_night) {
    options.maximum_price_per_night *= 100;
    queryParams.push(`${options.maximum_price_per_night}`);
    if (queryString.length < 150){
      queryString += `WHERE cost_per_night < $${queryParams.length} `;
    }
    else {
      queryString += `AND cost_per_night < $${queryParams.length} `;
    }
  }
  queryString += `
  GROUP BY properties.id
  `;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) > $${queryParams.length} `;
  }
  // 4
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => {
      return (err.message);
    });
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

 const addProperty = (propertyObj) => {
  return pool
    .query(`
    INSERT INTO properties(owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [propertyObj.owner_id, propertyObj.title, propertyObj.description, propertyObj.thumbnail_photo_url, propertyObj.cover_photo_url, propertyObj.cost_per_night, propertyObj.street, propertyObj.city, propertyObj.province, propertyObj.post_code, propertyObj.country, propertyObj.parking_spaces, propertyObj.number_of_bathrooms, propertyObj.number_of_bedrooms])
    .then((result) => result.rows[0])
    .catch((err) => {
      return (err.message);
    });
};
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }
exports.addProperty = addProperty;
