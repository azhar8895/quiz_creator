export const initialValues = {
    email: '',
    password: '',
};

export const validate = (values) => {
    const errors = {};
    if (!values?.email) {
        errors.email = 'Email is required';
    }
    if (
        values?.email &&
        !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/.test(values?.email?.toLowerCase())
    ) {
        errors.email = 'Not a valid Email';
    }
    if (!values?.password) {
        errors.password = 'Password is required';
    }
    return errors;
};
export const validateSignUp = (values) => {
    const errors = {};
    if (!values?.email) {
        errors.email = 'Email is required';
    }
    if (
        values?.email &&
        !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/.test(values?.email?.toLowerCase())
    ) {
        errors.email = 'Not a valid Email';
    }
    if (!values?.password) {
        errors.password = 'Password is required';
    }
    if (!values?.name) {
        errors.name = 'Name is required';
    }
    console.log("Errors", errors);
    return errors;
};