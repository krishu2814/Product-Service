const attachUser = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];
    const userEmail = req.headers['x-user-email'];

    if (userId || userRole) {
        req.user = {
            id: userId,
            userId: userId,
            _id: userId,
            email: userEmail,
            role: userRole
        };
    } else {
        req.user = null;
    }

    next();
};

module.exports = attachUser;
