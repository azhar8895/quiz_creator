import * as yup from 'yup';

export const getValidationSchema = () => {
    const quiz_title = yup.string().trim().required('Quiz title is required');
    const option = yup.object().shape({
        option_text: yup.string().required("Option text is required"),
        is_correct: yup.boolean().required("Please select atleast one option as correct"),
    })
    const question = yup.object().shape(
        {
            question_statement: yup.string().required('Question statement is required'),
            options: yup.array().of(yup.object(option))
        }
    )
    return yup.object({
        quiz_title,
        questions: yup.array().of(yup.object(question))
    });
}
