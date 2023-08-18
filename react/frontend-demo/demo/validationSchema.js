import * as yup from 'yup';

const emailValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required('Email input is required')
})

const passwordValidationSchema = yup.object().shape({
    password: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .max(20, "Password must be within 20 characters")
        .required('Password input required'),
})

export {
    emailValidationSchema,
    passwordValidationSchema
};