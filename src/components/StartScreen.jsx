const StartScreen = ({ numQuestions, dispatch }) => (
  <div className='start'>
    <h2>Welcome to the Quiz</h2>
    <h3>{numQuestions} questions to test your React Mastery</h3>
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'quizStart' })}
    >
      Let&apos;s Start
    </button>
  </div>
);

export default StartScreen;
