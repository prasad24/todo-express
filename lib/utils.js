import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const isValidDate = (dt) => {
    return moment(dt, process.env.DATE_FORMAT, true).isValid();
}

export const isValidPasswordPattern = (password) => {
    return  password.length >= 8 && //has at least 8 characters
            /[A-Z]/.test(password) && //has uppercase
            /[a-z]/.test(password) && //has lowercase
            /\d/.test(password) && //has digits
            /\W/.test(password); // has special characters (non-alphanumeric)
}

export const getPasswordHash = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const validatePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
