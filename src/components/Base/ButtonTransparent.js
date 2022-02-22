import "./ButtonTransparent.css";

const ButtonTransparent = (props) => {
  return (
    <button className={`button-transparent-base ${props.className}`}>
      {props.children}
    </button>
  );
};

export default ButtonTransparent;
