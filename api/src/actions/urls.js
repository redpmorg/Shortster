import { nanoid } from "nanoid";
import { isUrl } from "../utils/tools.js";
import sequelize from "../sequelize.js";

export const create = async (req, res) => {
  const shortUrlMaxSize = 6;
  const shortUrlMinReqSize = 4;

  let { longUrl, shortUrl } = req.body;

  console.log(longUrl, shortUrl);

  if (!longUrl || !isUrl(longUrl)) {
    return res.send([{error: "Long URL is missing or invalid or already exists!"}]);
  }

  if (shortUrl && shortUrl.length < shortUrlMinReqSize) {
    return res.send([{error: "Short URL length should be min 4 chars!"}]);
  }

  if (!shortUrl) {
    shortUrl = nanoid(6);
  }

  const url = await sequelize.models.url.create({
    urllong: longUrl,
    urlshort: shortUrl,
  });

  return res.json(url);
};

export const getByShortUrlThenRedirect = async (req, res) => {
  const where = {
    urlshort: req.params.url,
  };
  const url = await sequelize.models.url.findOne({ where });
  if (url) {
    await sequelize.models.url.update(
      { accessed: sequelize.literal("accessed+1") },
      { where }
    );
    return res.redirect(301, url.urllong);
  }

  return res.send([{error: "Impossible redirection!"}]);
};

export const getByShortUrl = async (req, res) => {
  const where = {
    urlshort: req.params.url,
  };
  const url = await sequelize.models.url.findOne({ where });

  if (url) {
    return res.json(url);
  }
  return res.send([{error: "Redirection URI is not registered!"}]);
};
