

module.exports = function createEnsureRole(role) {
  return ({ user }, res, next) => {

    if(!(user.roles.includes(role))) {
      next({
        statusCode: 401,
        error: 'Need admin access'
      });
    }
    else {
      next();
    }
  };
};


