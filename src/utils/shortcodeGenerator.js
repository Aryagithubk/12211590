const Url = require('../models/Url');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const randomString = (length = 6) =>
  Array.from({ length }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');

const generateUniqueShortcode = async (desired = null) => {
  if (desired) {
    if (!/^[a-zA-Z0-9]{1,20}$/.test(desired)) throw new Error('Invalid shortcode format');
    if (await Url.exists({ shortcode: desired })) throw new Error('Shortcode already in use');
    return desired;
  }
  let code;

  while (true) {
    code = randomString();
    if (!(await Url.exists({ shortcode: code }))) break;
  }
  return code;
};

module.exports = { generateUniqueShortcode };
