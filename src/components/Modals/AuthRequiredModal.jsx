
import { NavLink } from "react-router-dom";
import { store } from "../../main";
import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import { observer } from "mobx-react-lite";

const AuthRequiredModal = observer(() => {
  return (
    <Modal
      isOpen={store.authModalVisible}
      onClose={store.closeAuthModal}
    >
      <div style={{ textAlign: "center" , display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <h3>Требуется регистрация</h3>
        <p>Чтобы продолжить, пожалуйста, <NavLink to="/register" onClick={store.closeAuthModal}>авторизуйтесь</NavLink> или зарегистрируйтесь.</p>
        <Button onClick={store.closeAuthModal}>Ок</Button>
      </div>
    </Modal>
  );
});

export default AuthRequiredModal;