function Box(props) {
  let state = "text-black border-2 border-gray-300 dark:text-white";
  if (props.state === "C") state = "bg-emerald-500 text-white";
  if (props.state === "E") state = "bg-amber-500 text-white";
  if (props.state === "N") state = "bg-zinc-500 text-white dark:bg-gray-700";

  return (
    <div
      className={
        "w-8 h-8 sm:w-10 sm:h-10 grid place-items-center p-0 m-0 font-bold text-lg sm:text-2xl " + state
      }
    >
      {props.value}
    </div>
  );
}

function Help() {
  return (
    <>
      <p className="text-left text-sm sm:text-base py-5 font-regular opacity-75 mr-1">
        Guess the WORDLE in six tries.
        <br />
        Each guess must be a five-letter word. Hit the enter button to
        submit.
        <br /> After each guess, the color of the tiles will change to show how
        close your guess was to the word.
      </p>
      <hr />
      <h3 className="text-left font-bold py-5">Example</h3>
      <div className="flex gap-1">
        <Box value="S" state="C" />
        <Box value="L" />
        <Box value="E" state="E"/>
        <Box value="E" state="N"/>
        <Box value="P" />
      </div>
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
        The letter <b>S</b> is in the word and in correct spot.<br/>
        The letter <b>E</b> is in the word and incorrect spot.<br/>
        The letter <b>N</b> is not in the word.
      </p>
    </>
  );
}

export default Help;
