const getHexColor = () => {
  const hexCodes = ["a", "b", "c", "d", "e", "f", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[randomIndex(hexCodes)];
  }
  return color;
};

function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

const colors = ["red", "green", "blue", "orange", "yellow", "deeppink", "aqua"];

function Header({ hex, setHex }) {
  return (
    <header className="header bottom-dark-shadow bds-5 pt-little position-relative">
      <div className="container d-grid grid-columns-two pt-5 pb-5">
        <span className="header__logo text-sky letter-spacing-4 text-capitalize text-roboto">
          Color Flipper
        </span>
        <div className="text-open-sans header__end text-right">
          <a
            onClick={(e) => {
              e.preventDefault();
              setHex(false);
            }}
            className={`${
              !hex ? "active" : ""
            } letter-spacing-4 mr-4 text-primary`}
            href="#"
          >
            Simple
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              setHex(true);
            }}
            className={`${
              hex ? "active" : ""
            } letter-spacing-4 mr-4 text-primary`}
            href="#"
          >
            Hex
          </a>
        </div>
      </div>
    </header>
  );
}

function MainContent({ hex }) {
  const [index, setIndex] = React.useState(0);
  const [color, setColor] = React.useState(hex ? getHexColor() : colors[index]);

  const changeColor = () => {
    let color;
    if (hex) {
      color = getHexColor();
    } else {
      let newIndex = randomIndex(colors);
      newIndex =
        newIndex === index ? (!index ? index + 1 : index - 1) : newIndex;

      setIndex(newIndex);
      color = colors[newIndex];
    }
    setColor(color);
  };

  React.useEffect(() => {
    changeColor();
  }, [hex]);

  return (
    <section
      className="main-content d-grid align-items-center"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="container text-center">
        <h2 className="text-roboto text-9 radius-4 bg-secondary letter-spacing-4">
          <span className="text-white">Color:</span>{" "}
          <span
            style={{
              color: color,
            }}
            className="text-sky"
          >
            {color}
          </span>
        </h2>
        <button onClick={ changeColor} className="button button--1 mt-8">
          Change
        </button>
      </div>
    </section>
  );
}

function App() {
  const [hex, setHex] = React.useState(false);

  React.useEffect(() => {
    history.pushState({}, "", hex ? "hex" : "simple");
  }, [hex]);

  return (
    <React.Fragment>
      <Header hex={hex} setHex={setHex} />
      <MainContent hex={hex} />
    </React.Fragment>
  );
}

const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
