import "./Confirmation.css";

const Confirmation = ({ loading, status = "success" }) => {
  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <div className="loader-confirmation"></div>
        </div>
      ) : status === "success" ? (
        <div className="wrapper-success">
          <svg
            className="checkmark-success"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-success__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-success__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      ) : (
        <div className="wrapper-failed">
          <svg
            className="checkmark-failed"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark-failed__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark-failed__cross"
              fill="none"
              d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
