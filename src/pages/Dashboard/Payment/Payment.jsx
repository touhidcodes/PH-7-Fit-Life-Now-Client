import { Elements } from '@stripe/react-stripe-js';
import useCart from '../../../hooks/useCart/useCart';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
	const [cart] = useCart();
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const price = parseFloat(total.toFixed(2));
	return (
		<div>
			<h2 className='text-3xl'> Make Payment</h2>
			<Elements stripe={stripePromise}>
				<CheckoutForm cart={cart} price={price}></CheckoutForm>
			</Elements>
		</div>
	);
};

export default Payment;
