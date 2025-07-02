import logo from "../../assets/Header/main-logo.png";

const NotFound = () => {
  return (
    <div className="not-found h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt="logo" />
        <h1 className="text-4xl font-bold text-[var(--main-text)]  ">404</h1>
        <p className="text-2xl text-[var(--main-text)]">Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
