/**
 * @typedef {object} Product
 * @property {integer} id
 * @property {string} name
 * @property {string|null} description
 * @property {number} price
 * @property {boolean} outOfStock
 * @property {string} startSellAt
 * @property {string|null} finishSellAt
 * @property {number|null} discount
 * @property {string|null} startDiscountAt
 * @property {string|null} finishDiscountAt
 * @property {boolean} onlyInRestaurant
 * @property {number|null} priceByKmInDelivery
 * @property {array<ProductImage>} productImageList
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string|null} finishedAt
 */

/**
 * @typedef {object} ProductImage
 * @property {integer} id
 * @property {string} url
 * @property {boolean} primary
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string|null} finishedAt
 */
