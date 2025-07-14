const Url = require('../models/Url');
const { generateUniqueShortcode } = require('../utils/shortcodeGenerator');
const { getGeoLocation } = require('../utils/geoLocation');

exports.createShortUrl = async ({ url, validity, shortcode }) => {
  const code = await generateUniqueShortcode(shortcode);
  const minutes = validity && Number.isInteger(validity) ? validity : 30;
  const expiry = new Date(Date.now() + minutes * 60000);

  const newUrl = await Url.create({ originalUrl: url, shortcode: code, expiry });
  return {
    shortLink: `${process.env.HOST || 'http://localhost:3000'}/r/${code}`,
    expiry: expiry.toISOString(),
  };
};

exports.getStatsByShortcode = async (shortcode) => {
  const data = await Url.findOne({ shortcode });
  if (!data) throw new Error('Shortcode not found');

  return {
    originalUrl: data.originalUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    clickCount: data.clickCount,
    clicks: data.clicks,
  };
};

exports.handleRedirect = async (req) => {
  const { shortcode } = req.params;
  const data = await Url.findOne({ shortcode });
  if (!data) throw new Error('Shortcode does not exist');
  if (new Date() > new Date(data.expiry)) throw new Error('Link expired');

  data.clickCount += 1;
  const referrer = req.get('Referrer') || 'direct';
  const ip = req.ip;
  const location = await getGeoLocation(ip);

  data.clicks.push({
    referrer,
    ip,
    location,
    timestamp: new Date(),
  });

  await data.save();
  return data.originalUrl;
};
