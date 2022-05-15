import { useFormik } from 'formik';
import { initialValues, validate, onSubmit } from '../../helpers/signin';

import NavBar from '../Shared/navbar/index';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import ModalBox from "../Shared/ModalBox";
// const styles = makeStyles((theme) => ({
//     label: {
//         fontSize: '18px',
//     },
//     root: {
//         '& .MuiFilledInput-root': {
//             background: '#c6d3d2',
//         },
//     },
// }));

function Home() {
    const [quiz, setQuiz] = useState([]);
    const [showModal, setshowModal] = useState([]);
    const location = useLocation()
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate,
        onSubmit: async (values) => {
            const res = await axios.post(
                'http://localhost:3001/auth/login',
                {
                    email: values.email,
                    password: values.password
                }
            )
            console.log("Res", res)
            const data = res.data;
            if (data?.res?.login === 'success' && data?.res?.token) {
                localStorage.setItem("token", data.res.token)
            }
        },
    });

    useEffect(
        () => {
            getQuiz();
            console.log("Location", window.location.origin)
        },
        []
    )

    const getQuiz = async () => {
        try {
            const token = localStorage.getItem('token');
            const quizRes = await axios.get("http://localhost:3001/quiz/get", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            console.log("Quiz res", quizRes.data);
            if (quizRes?.data?.length) {
                setQuiz([...quizRes?.data]);
            }

        } catch (err) {
            console.log("Err", err);
        }
    }
    const deleteQuiz = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const quizRes = await axios.delete("http://localhost:3001/quiz/delete", {
                headers: {
                    authorization: `Bearer ${token}`
                },
                data: {
                    quiz_id: id
                }
            })
            console.log("Quiz res", quizRes.data);
            getQuiz()

        } catch (err) {
            console.log("Err", err);
        }
    }
    // const classes = styles();

    const CreateQuiz = () => {

        const [questions, setQuestions] = useState([]);
        const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
            enableReinitialize: true,
            initialValues: {
                title: "",
                questions: [
                    ...questions
                ]
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
            console.log("Questions", qstns);
            setQuestions([...qstns]);
        }
        return (
            <div className="p-3" >
                <div>
                    <h4>Create Quiz</h4>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="form-group mb-2 col-6">
                                <label className="m-2">Quiz title</label>
                                <input
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                    // type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />

                                <div>
                                    {formik.errors.title}
                                </div>
                            </div>
                            <div className="col-6">
                                <button onClick={addQuestion} className="btn btn-light float-end">Add Question</button>
                            </div>
                        </div>
                        <div className="row">
                            { questions.map((q, index) => {
                                return (
                                    <div className="form-group col-12 card my-3 p-3">
                                        <div className="col-6">
                                            <div className="col-2">
                                                Title
                                            </div>
                                            {/* <div className="col-10">
                                                <input type="text" 
                                                name={`questions.${index}.title`} 
                                                value={values.questions[index].title} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                            </div> */}
                                        </div>
                                    </div>)
                            })
                            }
                        </div>
                    </form>
                </div>
            </div>

        )
    }

    return (
        <>
            <NavBar />
            {/* <Button>Create Quiz</Button> */}
            <ModalBox openModal={true} classToOverride="w-75"><CreateQuiz /></ModalBox>

            <div className="h-100 px-5 float-end py-3">
                <button className="btn btn-light">Create-quiz</button>
            </div>
            <div className="h-100 align-items-center p-5">
                {quiz?.map(
                    (q) => (
                        <div className="card w-100 mx-auto my-3 p-3">
                            <div >
                                <div>{q.title}</div>
                                <div>Quiz link: {`${window.location.origin}/${q.permid}`}</div>
                            </div>
                            <div><button onClick={() => deleteQuiz(q.id)} className="btn btn-danger float-end">Delete</button></div>

                        </div>
                    )
                )
                }
            </div>
        </>
    );
};

export default Home;
