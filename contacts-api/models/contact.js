/**
 * Contact document shape (MongoDB).
 *
 * {
 *   _id: ObjectId,
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   favoriteColor: string,
 *   birthday: string ("1995-09-21")
 * }
 */

// Optional helper to create a new contact document
function createContact({ firstName, lastName, email, favoriteColor, birthday }) {
  return {
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday,
  };
}

module.exports = {
  createContact,
};
