import "./styles.css";
import {
  createContext,
  createRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState
} from "react";

const AppContext = createContext(null);

const Button = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);
  useImperativeHandle(ref, () => ({
    alterToggle() {
      setToggle(!toggle);
    }
  }));
  return (
    <>
      <button> Button from child</button>
      {toggle && <p>Toggle</p>}
    </>
  );
});

const Login = (props) => {
  const { setUserName } = useContext(AppContext);
  console.log("vineet", setUserName);
  return (
    <input type="text" onChange={(evt) => setUserName(evt.target.value)} />
  );
};
const User = (props) => {
  const { userName } = useContext(AppContext);
  return <span>{userName}</span>;
};

export default function App() {
  const reducer = useCallback((state, action) => {
    switch (action) {
      case "INCREMENT":
        return { ...state, count: state.count++ };
      case "TOGGLE_VISIBLE":
        return { ...state, visible: !state.visible };
      default:
        return state;
    }
  }, []);

  const initialState = useMemo(() => {
    return { count: 0, visible: false };
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const inputRef1 = createRef(null);
  const inputRef2 = createRef(null);
  const [userName, setUserName] = useState("");

  const inputChangeHandler = useCallback(() => {
    inputRef.current.focus();
    inputRef.current.value = "";
  });

  const CustomButton = forwardRef((props, ref) => {
    return (
      <button type="text" ref={ref}>
        {props.children}
      </button>
    );
  });

  useLayoutEffect(() => {
    console.log("Vineet layut effect");
  });

  useEffect(() => {
    console.log("vineet");
  }, []);
  return (
    <div className="App">
      <h1>An example of useReducer!</h1>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch("INCREMENT");
          dispatch("TOGGLE_VISIBLE");
        }}
      >
        CLICK ME
      </button>
      {state.visible && <span>magic happens</span>}
      <h1>An example of useRef!</h1>
      <input type="text" ref={inputRef} />
      <button onClick={inputChangeHandler}>clear the text</button>
      <h1>An example of forwardRef!</h1>
      <CustomButton ref={inputRef1}>hello input</CustomButton>
      <button
        onClick={() => {
          inputRef1.current.style.color = "red";
        }}
      >
        change the button to the left
      </button>
      <h1>An example of useimperativeHandle- alter child state from parent</h1>
      <button
        onClick={() => {
          inputRef2.current.alterToggle();
        }}
      >
        button from the parent class
      </button>
      <Button ref={inputRef2} />
      <h1>An exmaple of context api</h1>
      <AppContext.Provider value={{ userName, setUserName }}>
        <User />
        <Login />
      </AppContext.Provider>
    </div>
  );
}
