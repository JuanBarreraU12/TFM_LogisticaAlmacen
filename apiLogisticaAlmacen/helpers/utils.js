// const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

const executeQueryOne = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, result) => {
            if (error) return reject(error);
            if (result.length === 0) return resolve(null);
            resolve(result[0]);
        });
    });
}

const createToken = (user) => {
    const obj = {
        user_id: user.id,
        user_role: user.role,
        // expiration_date: dayjs().add(30, 'minutes').unix()
    }

    return jwt.sign(obj, process.env.SECRET_KEY);
}

const sendEmail = (user, order) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_ACCOUNT,
        to: user.email,
        subject: "TFM's Test",
        html: `
            <strong>Name:</strong> ${user.name} ${user.first_last_name} <br/>
            <strong>Role:</strong> ${user.role} <br/>
            <strong>Order:</strong> ${order.id} <br/>
            <p>You have changed the order's state to <strong>${order.state}</strong></p>
        `
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return reject(error);
            else return resolve(info);
        })
    });
}

module.exports = {
    executeQuery,
    executeQueryOne,
    createToken,
    sendEmail
}