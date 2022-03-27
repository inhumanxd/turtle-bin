const authenticate = async (req, res, next) => {
  const api_key = req.headers["x-api-key"].split(" ")[1];
  if (api_key != process.env.API_KEY) {
    res.status(401).send("Authentication failed! Invalid API Key.");
    return;
  }
  next();
};

module.exports = authenticate;
