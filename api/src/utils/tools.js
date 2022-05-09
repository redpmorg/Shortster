export const isUrl = (url) => {
  const urlRule =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const regex = new RegExp(urlRule);
  return url.match(regex);
};

// wrapper to workaround async errors not being transmitted correctly.
export const makeHandlerAwareOfAsyncErrors = (handler) => {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}
