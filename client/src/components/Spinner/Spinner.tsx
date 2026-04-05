import "../Spinner/spinner.css";

interface dynamicSpinnerScale {
  scale?: number;
}

export const Spinner = ({ scale }: dynamicSpinnerScale) => {
  const spinnerWidth = scale;
  return (
    <>
      <div className="banter-loader">
        <span className="loader" style={{ scale: spinnerWidth }}></span>
      </div>
    </>
  );
};
