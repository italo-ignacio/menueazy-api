export interface AddressType {
  city: string;
  country: string;
  number: string;
  street: string;
  state: string;
  zipCode: string;
  complement: string;
  latitude: string;
  longitude: string;
}

/**
 * @typedef {object} InsertAddressBody
 * @property {string} city.required
 * @property {string} country.required
 * @property {string} number.required
 * @property {string} street.required
 * @property {string} state.required
 * @property {string} zipCode.required
 * @property {string} complement.required
 * @property {string} latitude.required
 * @property {string} longitude.required
 */
