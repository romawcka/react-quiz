import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Progress from './components/Progress';
import Question from './components/Question';
import Footer from './components/Footer';
import Timer from './components/Timer';
import Button from './components/Button';
import FinishScreen from './components/FinishScreen';

const apiUrl = import.meta.env.REACT_APP_URL;
const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  secondsRemaining: null,
  status: 'Loading', // error, ready, start, finish
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'Ready',
      };
    case 'quizStart':
      return {
        ...state,
        status: 'Start',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'quizFinish':
      return {
        ...state,
        status: 'Finish',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'quizRestart':
      return {
        ...state,
        status: 'Ready',
        questions: state.questions,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'dataRejected':
      return {
        ...state,
        status: 'Error',
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'Finish' : state.status,
      };
    default:
      state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  useEffect(() => {
    fetch(apiUrl ?? 'http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataRejected' }));
  }, []);

  const numQuestions = questions.length;

  const maxAvailablePoints = questions.reduce(
    (prv, curr) => prv + curr.points,
    0
  );

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'Loading' && <Loader />}
        {status === 'Error' && <Error />}
        {status === 'Ready' && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === 'Start' && (
          <>
            <Progress
              index={index}
              answer={answer}
              points={points}
              numQuestions={numQuestions}
              maxAvailablePoints={maxAvailablePoints}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <Button
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'Finish' && (
          <FinishScreen
            points={points}
            dispatch={dispatch}
            highscore={highscore}
            maxAvailablePoints={maxAvailablePoints}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
