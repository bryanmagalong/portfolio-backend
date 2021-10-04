/*
 * The async function should be called by Express and not by catchAsync
 * catchAsync has to return an anonymous function
 * which contains the async function
 */
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
