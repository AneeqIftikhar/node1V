const middleware = () => {
  return (err, req, res, next) => {
    console.log(err)
    res
      .status(err.status || 500)
      .json({ errorCode: err.status, message: err.message });
  };
};
module.exports = middleware;
