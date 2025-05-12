import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.slice(7);
    if (!token) {
        console.log('No token provided');
        res.status(401).json({error: 'Доступ запрещён'});
        return;
    }
    try {
        const decoded= jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Неверный токен' });
    }
}