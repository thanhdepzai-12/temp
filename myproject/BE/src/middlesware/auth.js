const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware kiểm tra token
const auth = (req, res, next) => {
    const whiteList = ['/logins', '/register', '/Upload'];
    const apiPath = '/v1/api';

    // Kiểm tra nếu đường dẫn hiện tại nằm trong white list
    if (whiteList.some(item => apiPath + item === req.originalUrl)) {
        return next(); // Không cần kiểm tra token, tiếp tục xử lý
    }

    // Kiểm tra token từ header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "You didn't pass Access_token or your Access Token has expired"
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded._id
        };
        console.log("Token decoded:", decoded);
        next(); // Tiếp tục xử lý nếu token hợp lệ
    } catch (error) {
        // Kiểm tra loại lỗi
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired, please log in again"
            });
        } else {
            return res.status(401).json({
                message: "Token is invalid"
            });
        }
    }
};

module.exports = auth;
