import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../Util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Buttton";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttps.js";
import Error from "./Errore.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UserProgressContext);

  console.log('cartCtx', cartCtx)

  console.log('UserProgressCtx', UserProgressCtx)

  const {
    data,
    isLoading: isSending,
    sendRequest,
    error,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  console.log('isSending', isSending)
  console.log('sendRequest', sendRequest)


  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    UserProgressCtx.hideCheckout();
  }

  function handleFinish() {
    UserProgressCtx.hideCheckout();
    cartCtx.clearCart();
  }

  function handleSubmit(event) {

    console.log('event', event)
    event.preventDefault();
    const fd = new FormData(event.target);

    console.log('fd', fd)

    const customerData = Object.fromEntries(fd.entries());

    console.log('customerData', customerData)
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data ...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={UserProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>SUCCESS!</h2>
        <p>Your order submitted successfully</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-action">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={UserProgressCtx.progress === "checkout"}
      onClose={UserProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" id="full-name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit orders.." message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
