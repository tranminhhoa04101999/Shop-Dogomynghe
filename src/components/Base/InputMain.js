import "./InputMain.css";

const InputMain = (props) => {
  return (
    <input
      type={props.type}
      className="input-main-wrap"
      style={props.style}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default InputMain;
