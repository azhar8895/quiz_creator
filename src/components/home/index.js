import { useFormik } from 'formik';
import { initialValues, validate, onSubmit } from '../../helpers/signin';

import NavBar from '../Shared/navbar/index';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalBox from "../Shared/ModalBox";
import CreateQuiz from '../createquiz/index'

function Home() {
    const [quiz, setQuiz] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();
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

   

    return (
        <>
            <NavBar />
            {/* <Button>Create Quiz</Button> */}
            <ModalBox openModal={showModal} classToOverride="w-75"><CreateQuiz setShowModal={setshowModal}/></ModalBox>

            <div className="h-100 px-5 float-end py-3">
                <button className="btn btn-light" onClick={() => {setshowModal(true)}}>Create-quiz</button>
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
