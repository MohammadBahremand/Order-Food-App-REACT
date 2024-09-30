import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import { currencyFormatter } from "../Util/formatting.js";
import Button from "./UI/Buttton";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const cartCxt = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCxt.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGotoCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} 
    onClose={userProgressCtx.progress === "cart"? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCxt.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            ondicrease={() => cartCxt.removeItem(item.id)}
            onincrease={() => cartCxt.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCxt.items.length > 0 && (
          <Button onClick={handleGotoCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
