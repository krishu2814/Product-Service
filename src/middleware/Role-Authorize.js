const RoleAuthorization = (...Roles) => {
    return (req, res, next) => {
        // console.log(req.headers);
        // console.log(req.headers['x-user-role']);
        // req.user is set by the Authentication middleware -> AUTH-SERVICE
        if (!req.user || !Roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have the required role to access this resource'
            });
        }
        next();
    }
}

module.exports = RoleAuthorization;
