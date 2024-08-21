const Button = ({ dispatch, answer, index, numQuestions }) => {
  if (!answer) return;

  if (index < numQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  // if (index === numQuestions - 1)
  //   return (
  //     <button
  //       className='btn btn-ui'
  //       onClick={() => dispatch({ type: 'quizFinish' })}
  //     >
  //       Finish
  //     </button>
  //   );

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'quizFinish' })}
    >
      Finish
    </button>
  );
};

export default Button;
