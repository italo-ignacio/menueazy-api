/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} firebaseId
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} role - enum:ADMIN,MANAGER,OWNER,EMPLOYEE,DELIVERY_PERSON
 * @property {UserCompany} company
 * @property {string} finishedAt
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {object} UserCompany
 * @property {number} id
 * @property {string} companyUrl
 * @property {string} name
 */
