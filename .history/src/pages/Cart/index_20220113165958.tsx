import { rem } from 'polished';
import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    // TODO
    ...product,
    priceFormatted : formatPrice(product.price),
    subtotal : formatPrice(product.amount * product.price),


  }))
  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        // TODO
        return sumTotal + product.amount * product.price
      }, 0)
    )

  function handleProductIncrement(product: Product) {
    // TODO
    updateProductAmount({productId :product.id, amount : product.amount + 1})
  }

  function handleProductDecrement(product: Product) {
    // TODO
    updateProductAmount({productId :product.id, amount : product.amount -1 })
  }

  function handleRemoveProduct(productId: number) {
    // TODO
    removeProduct(productId)
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(product => (
            <tr key={product.id} data-testid="product">
            <td>
              <img src={product.image} alt={product.title} />
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.price}</span>
            </td>
            <td>
              <div>
                <button
                  type="button"
                  data-testid="decrement-product"
                disabled={product.amount <= 1}
                onClick={() => handleProductDecrement(product)}
                >
                  <MdRemoveCircleOutline size={20} />
                </button>
                <input
                  type="text"
                  data-testid="product-amount"
                  readOnly
                  value={2}
                />
                <button
                  type="button"
                  data-testid="increment-product"
                onClick={() => handleProductIncrement(product)}
                >
                  <MdAddCircleOutline size={20} />
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subtotal}</strong>
            </td>
            <td>
              <button
                type="button"
                data-testid="remove-product"
              onClick={() => handleRemoveProduct(product.id)}
              >
                <MdDelete size={20} />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ 359,80</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
