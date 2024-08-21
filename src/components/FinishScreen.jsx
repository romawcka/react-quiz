const FinishScreen = ({ points, dispatch, highscore, maxAvailablePoints }) => {
  const percentage = (points / maxAvailablePoints) * 100;

  let emoji;
  if (percentage >= 95) emoji = '🥇';
  if (percentage >= 85 && percentage < 95) emoji = '🥈';
  if (85 <= percentage < 95) emoji = '🥈';
  if (percentage >= 75 && percentage < 85) emoji = '🥉';
  if (percentage >= 55 && percentage < 75) emoji = '😐';
  if (percentage < 45) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> Your score <strong>{points}</strong> out of{' '}
        {maxAvailablePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'quizRestart' })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
