import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useParams } from 'react-router';

 function SolveQuiz() {
   const params = useParams();
   const [quiz, setQuiz ] = useState({});
  const [validation, setValidation] = useState(true);
  const [output, setOutput] = useState({});
  
  useEffect(() => {
    console.log("params", params);
 
    getQuizByPermId()
    // setOutput();
  }, []);

  const getQuizByPermId = async () => {
    const res = await axios.get(`http://localhost:3001/quiz/get-by-permid?permid=${params.permid}`)
    console.log("Response", res);
    const qst = res.data;
    const data = {
      id: qst?.id,
      title: qst.title,
      questions: [...qst.questions].map((d) => ({
        ...d,
        selected_answer: []
      })),
    };
    setQuiz({...data});
    setOutput({...data});
  }

  const selectOutput = (questionIndex, answerIndex, has_multiple) => {
    const arr = quiz?.questions?.[questionIndex]?.selected_answer || [];
    quiz.questions[questionIndex]["has_multiple"] = has_multiple;
    if (has_multiple) {
      if (!arr?.includes(answerIndex)) arr.push(answerIndex);
      else arr.splice(arr.indexOf(answerIndex), 1);
    } else if (!has_multiple) arr[0] = answerIndex;
    quiz.questions[questionIndex].selected_answer = [...arr];
    setValidation(validateFinalState(quiz?.questions));
    console.log("validation", validateFinalState(quiz?.questions));
  };

  const validateFinalState = (questions) => {
    for (let key of questions) {
      if (key?.selected_answer?.length == 0) return true;
    }
    return false;
  };

  const handleSubmit = (_) => {
    console.log("handle Submit called", quiz);
  };
  // const getQuestions = (questions) => {
  //   console.log("Questions", questions);
  //   let durationBody = 
  //   return durationBody;
  // };

  return (
    <>
      <div className="quiz-container" id="quiz">
        <h2 id="question">{quiz.title}</h2>

        {quiz?.questions?.map((item, i) => {
          return (
            <div className="quiz-container col-lg-12 col-md-10" id="quiz" key={i}>
              <div className="container-abc">
                <div className="statement">
                  <h2>{item.question_statement}</h2>
                </div>

                <div id="answer">
                  {item?.options?.map((options, index) => {
                    return (
                      <>
                        <div className="statement_w answers">
                          <ul key={options?.id} className="snswer_key">
                            <li data-id={index}>
                              {String.fromCharCode(65 + index)}
                              <input
                                type={
                                  item?.has_multiple_answers ? "checkbox" : "radio"
                                }
                                name="answer"
                                id="a"
                                className="answer"
                                onChange={(params) =>
                                  selectOutput(
                                    i,
                                    options?.id,
                                    item?.has_multiple_answers,
                                    params?.target.checked
                                  )
                                }
                              />

                              <span></span>

                              <label htmlFor="a" id="a_text">
                                <span>{options?.option_text}</span>
                              </label>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <button id="submit" onClick={handleSubmit} disabled={validation}>
          Submit
        </button>
      </div>
    </>
  );
}

export default SolveQuiz;
