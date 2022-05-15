import axios from "axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { getValidationSchema } from "../../helpers/quiz";

const CreateQuiz = ({setShowModal}) => {

    const [questions, setQuestions] = useState([]);
    const { values, handleChange, handleBlur, handleSubmit, errors, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            questions: [
                ...questions
            ]
        },
        // validationSchema: () => getValidationSchema(),
        onSubmit: async(values) => {
            try{
            console.log('Values in submit', values);

            const token = localStorage.getItem('token');
            const quizRes = await axios.post("http://localhost:3001/quiz/create", 
            {...values},
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            console.log("values response from api", quizRes)
                setShowModal(false);
        } catch(err){
        }
        }
    }
    )

    useEffect(
        () => {
            console.log("Questions", questions);
        },
        [questions]
    )

    const addQuestion = () => {
        const qst = {
            question_statement: "",
            has_multiple_answers: false,
            options: [
                {
                    option_text: "",
                    is_correct: false,
                    option_index: 0
                },
                {
                    option_text: "",
                    is_correct: false,
                    option_index: 1
                },
                {
                    option_text: "",
                    is_correct: false,
                    option_index: 2
                },
                {
                    option_text: "",
                    is_correct: false,
                    option_index: 3
                },
                {
                    option_text: "",
                    is_correct: false,
                    option_index: 4
                },
            ]
        }
        const qstns = [...questions];
        qstns.push({ ...qst });
        // console.log("Questions", qstns);
        setQuestions([...qstns]);
    }

    const setRadioCheck = (index, j, clearAll = false) => {
        for (let i = 0; i < 5; i++) {
            if (clearAll || i !== j)
                setFieldValue(`questions.${index}.options.${i}.is_correct`, false)
        }
    }

    return (
        <div style={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '80vh' }} className={"p-3 "}>
            <div>
                <h4>Create Quiz</h4>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group mb-2 col-6">
                            <label className="m-2">Quiz title</label>
                            <input
                                name="title"
                                className="form-control"
                                placeholder="Title"
                                // type="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />

                            <div>
                                {errors.title}
                            </div>
                        </div>
                        <div className="col-6">
                            <button onClick={addQuestion} type="button" className="btn btn-light float-end">Add Question</button>
                        </div>
                    </div>
                    <div className="row">
                        {values?.questions.map((q, index) => {
                            return (
                                <div className="form-group col-12 card my-3 p-3">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="col-10">
                                                Question Statement
                                            </div>
                                            <div className="col-10">
                                                <input type="text"
                                                    name={`questions.${index}.question_statement`}
                                                    value={values.questions[index].question_statement}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>

                                        </div>
                                        <div className="col-6 h-100">
                                            <div className="p-3">
                                                Has Multiple Answers
                                                <input type="checkbox" className="m-2"
                                                    name={`questions.${index}.has_multiple_answers`}
                                                    checked={values.questions[index].has_multiple_answers}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setRadioCheck(index, 0, true)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row card p-2 mt-3">
                                        <div className="col-12">
                                            Options
                                        </div>
                                    </div>
                                    {
                                        q?.options?.map(
                                            (o, i) => {
                                                return (
                                                    <div className="col-12 p-3">
                                                        <div className="row">
                                                            <div className="col-1">
                                                                <input
                                                                    name={q.has_multiple_answers ? `questions.${index}.options.${i}.is_correct` : `questions.${index}.options`}
                                                                    type={q.has_multiple_answers ? 'checkbox' : 'radio'}
                                                                    onChange={
                                                                        (e) => {
                                                                            console.log("checked", i, e.target.checked);

                                                                            setFieldValue(`questions.${index}.options.${i}.is_correct`, e.target.checked)
                                                                            // } else{
                                                                            if (!q?.has_multiple_answers) {
                                                                                setRadioCheck(index, i)
                                                                            }
                                                                            // }
                                                                        }
                                                                    }
                                                                    checked={values.questions[index].options[i].is_correct}
                                                                />

                                                            </div>
                                                            <div className="col-6">
                                                                <input
                                                                    type="text"
                                                                    value={values?.questions[index]?.options[i]?.option_text}
                                                                    name={`questions.${index}.options.${i}.option_text`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="Option statement"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }

                                </div>
                            )
                        })
                        }
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-light m-2">Submit</button>
                        <button type="reset" className="btn btn-light m-2" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
           
        </div>

    )
}

export default CreateQuiz;