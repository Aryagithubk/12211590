const { createShortUrl, getStatsByShortcode, handleRedirect } = require('../services/url.service');
const { log } = require('../middlewares/logger');

exports.shortenUrl = async (req, res) => {
  try {
    const result = await createShortUrl(req.body);
    return res.status(201).json(result);
  } catch (err) {
    log('ERROR', 'Shorten URL failed', { message: err.message });
    return res.status(400).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const result = await getStatsByShortcode(req.params.shortcode);
    return res.status(200).json(result);
  } catch (err) {
    log('ERROR', 'Get Stats failed', { message: err.message });
    return res.status(404).json({ error: err.message });
  }
};

exports.redirectToLongUrl = async (req, res) => {
  try {
    const redirectUrl = await handleRedirect(req, res);
    if (redirectUrl) res.redirect(302, redirectUrl);
  } catch (err) {
    log('ERROR', 'Redirection failed', { message: err.message });
    return res.status(404).json({ error: err.message });
  }
};
