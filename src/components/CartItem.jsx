import { currencyFormatter } from "../Util/formatting.js";

export default function CartItem({name, quantity, price , onincrease , ondicrease}) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} * {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={ondicrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onincrease}>+ </button>
      </p>
    </li>
  );
}
