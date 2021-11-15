import request from 'request';
import User from '../../models/user.js';

export const addUserToSMTP = (options) => {
    return new Promise(async (resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            try {
                resolve(body);
            } catch (error) {
                reject(error);
            }
        });
    });
};

export const sendEmail = (options) => {
    return new Promise(async (resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            try {
                resolve(body);
            } catch (error) {
                reject(error);
            }
        });
    });
};


export const sendSms = (options) => {
    return new Promise(async (resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            try {
                resolve(body);
            } catch (error) {
                reject(error);
            }
        });
    });
};


export const sendViaWhatsapp = (options) => {
    return new Promise(async (resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) throw new Error(error);
            console.log(body, 'whatsapp');
            try {
                resolve(body);
            } catch (error) {
                reject(error);
            }
        });
    });
};

export const findStudents = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.find(filter)
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
