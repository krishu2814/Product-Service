const RoleAuthorization = (...Roles) => {
    return (req, res, next) => {
        // If req.user is not already populated, check forwarded headers from API Gateway
        if (!req.user) {
            const forwardedRole = req.headers['x-user-role'];
            const forwardedId = req.headers['x-user-id'];
            const forwardedEmail = req.headers['x-user-email'];

            if (forwardedRole && forwardedId) {
                req.user = {
                    id: forwardedId,
                    userId: forwardedId,
                    _id: forwardedId,
                    role: forwardedRole,
                    email: forwardedEmail
                };
            }
        }

        if (!req.user || !req.user.role) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Authentication required'
            });
        }

        if (!Roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have the required role to access this resource'
            });
        }

        next();
    };
};

module.exports = RoleAuthorization;
