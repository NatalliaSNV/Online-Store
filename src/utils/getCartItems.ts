import { ICartLot } from '../styles/types';

export default function getCartItems() {
    return JSON.parse(localStorage.cart);
}