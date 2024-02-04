import ReactDOM from "react-dom";
import classes from "../../css/modal.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        props.setVis(false);
      }}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Portalelement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop setVis={props.setVis} />, Portalelement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        Portalelement
      )}
    </>
  );
};

export default Modal;
