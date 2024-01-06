/**
 * Middleware for user role checking.
 * 
 * The roleChecker function returns middleware that checks whether a user has a specific role (admin or not).
 * If the user has the required role, it passes the request to the next handler; otherwise, it returns an access denied error.
 * 
 * @param {boolean} bool - A boolean value indicating whether the user must be an administrator (true) or not (false).
 * @returns {function} Middleware
 * 
 */

const roleChecker = (bool) =>  
    (req,res,next) =>
    {
        if (req.user && req.user.isAdmin === bool )
        {
            next();
        }else
        {
            res.status(401).json({
                status: 'fail',
                message: 'Access Denied',
            });
        }
    }


module.exports = {roleChecker};