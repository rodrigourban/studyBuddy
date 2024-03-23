import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import { getQuizDetails, updateQuiz } from "../services/apiQuiz";
import Loading from "../ui/Loading";
import { QuizType } from "../types";

function EditQuiz() {
  const [quiz, setQuiz] = useState<QuizType>();
  const { quizId } = useParams();

  useEffect(
    function () {
      async function fetchQuiz() {
        const response = await getQuizDetails(Number(quizId));
        setQuiz(response);
      }
      fetchQuiz();
    },
    [getQuizDetails, setQuiz, quizId]
  );

  if (!quiz) return <Loading message="Loading quiz..." />;

  return (
    <div className="relative bg-indigo-100">
      <div className="absolute h-56 w-full bg-gradient-to-r from-indigo-600 to-indigo-500"></div>
      <div className="p-5 relative">
        <h1 className="my-4 pl-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white font-primaryFont">
          👩🏻‍🎓 StudyBuddy
        </h1>
        <div className="flex flex-row">
          <Link
            to="/"
            className="pt-3 pl-3 text-2xl font-semibold text-white font-primaryFont border-white border-r-2 pr-5"
          >
            Go Back
          </Link>
          <h2 className="pt-3 pl-3 text-2xl font-semibold text-white font-primaryFont">
            Edit {quiz.title} quiz
          </h2>
        </div>

        <Formik
          initialValues={quiz}
          onSubmit={async (values) => {
            const response = await updateQuiz(
              values.questions,
              quizId as string
            );
            console.log("Edit quiz response: ", response);
          }}
        >
          {({ values }) => (
            <Form>
              <FieldArray name="questions">
                {({ insert, remove, push }) => (
                  <div className="flex flex-col space-y-5 p-5">
                    {values.questions.length > 0 &&
                      values.questions.map((question, index) => (
                        <div
                          className="rounded-lg grid grid-cols-2 p-5 bg-indigo-50 shadow-md gap-4"
                          key={index}
                        >
                          <div className="flex flex-col col-span-2">
                            <label
                              className="inputLabel"
                              htmlFor={`questions.${index}.question`}
                            >
                              Question
                            </label>
                            <Field
                              name={`questions.${index}.question`}
                              placeholder="Type here your question"
                              type="text"
                              className="input"
                            />
                            <ErrorMessage
                              name={`questions.${index}.question`}
                              component="div"
                              className="field-error"
                            />
                          </div>

                          {["First", "Second", "Third", "Forth"].map(
                            (option, optionIndex) => (
                              <div>
                                <label
                                  className="inputLabel"
                                  htmlFor={`questions.${index}.options`}
                                >
                                  {option} option
                                </label>
                                <Field
                                  name={`questions.${index}.options.${optionIndex}`}
                                  placeholder="Type possible answer"
                                  type="text"
                                  className="input"
                                  as="textarea"
                                />
                                <ErrorMessage
                                  name={`questions.${index}.options.${optionIndex}`}
                                  component="div"
                                  className="field-error"
                                />
                              </div>
                            )
                          )}

                          <div className="flex flex-col">
                            <label
                              className="inputLabel"
                              htmlFor={`questions.${index}.correctOption`}
                            >
                              Correct option
                            </label>
                            <Field
                              name={`questions.${index}.correctOption`}
                              as="select"
                              className="input"
                            >
                              <option value="0">First</option>
                              <option value="1">Second</option>
                              <option value="2">Third</option>
                              <option value="3">Forth</option>
                            </Field>
                            <ErrorMessage
                              name={`questions.${index}.correctOption`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label
                              className="inputLabel"
                              htmlFor={`questions.${index}.points`}
                            >
                              Points
                            </label>
                            <Field
                              name={`questions.${index}.points`}
                              placeholder="Type here the question points"
                              type="number"
                              className="input"
                            />
                            <ErrorMessage
                              name={`questions.${index}.points`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col-end-3">
                            <button
                              type="button"
                              className="primaryButton mt-5"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="primaryButton"
                      onClick={() =>
                        push({
                          question: "",
                          options: [],
                          correctOption: 0,
                          points: 0,
                        })
                      }
                    >
                      Add Question
                    </button>
                  </div>
                )}
              </FieldArray>
              <button type="submit" className="primaryButton">
                Edit Quiz
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditQuiz;
