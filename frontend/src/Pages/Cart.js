import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MessageBox from '../Components/MessageBox'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'

export const Cart = (props) => {
    const productId = props.match.params.id
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])
    const removeFromCartHandler = (id) => {
        //delete action
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return( 
        <div>
            <div>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 
                ? <MessageBox> 
                    Cart is empty. <Link to="/">Go Shopping</Link>
                 </MessageBox>
                : (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.product}>
                                    <div>
                                        <div>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.quantity} 
                                                    onChange={e => dispatch(addToCart(item.product, Number(e.target.value))
                                                    )} >
                                                {
                                                    [...Array(item.countInStock).keys()].map( x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            ${item.price}
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)} >Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )
                }
            </div>
            <div>
                <div>
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)} items) : 
                                ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}