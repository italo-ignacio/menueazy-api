/**
 * @typedef {object} Plan
 * @property {integer} id
 * @property {string} name
 * @property {string|null} description
 * @property {integer} minimumOfRestaurant
 * @property {integer} minimumOfProduct
 * @property {array<PlanPrice>} planPriceList
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string|null} finishedAt
 */

/**
 * @typedef {object} PlanPrice
 * @property {integer} id
 * @property {number} monthlyPrice
 * @property {number} priceOfRestaurant
 * @property {number} priceOfProduct
 * @property {number} discount
 * @property {string} period -enum:MONTHLY,ANNUAL
 * @property {Currency} currency
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string|null} finishedAt
 */
