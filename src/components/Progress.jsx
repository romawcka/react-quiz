const Progress = ({
  index,
  answer,
  points,
  numQuestions,
  maxAvailablePoints,
}) => (
  <header className='progress'>
    <progress max={numQuestions} value={index + Number(answer !== null)} />
    <p>
      Question <strong>{index + 1}</strong> of <strong>{numQuestions}</strong>
    </p>
    <p>
      <strong>{points}</strong> of <strong>{maxAvailablePoints}</strong> points
    </p>
  </header>
);

export default Progress;
