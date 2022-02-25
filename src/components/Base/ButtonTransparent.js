import './ButtonTransparent.css';

const ButtonTransparent = (props) => {
  return (
    <button
      className={`button-transparent-base ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ButtonTransparent;
