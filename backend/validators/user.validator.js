import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Invalid email'),

  body('fullname.firstname')
    .isLength({ min: 3 })
    .withMessage('Firstname should be at least 3 characters long'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long')
];



export const loginValidator = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
]; 