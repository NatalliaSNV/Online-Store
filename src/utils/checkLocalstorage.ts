import { ICartLots } from '../styles/types';

export default function checkLocalStorage(id: number) {
    if (localStorage.cart && localStorage.cart != null) {
        const storageArray: ICartLots[] = JSON.parse(localStorage.cart);
        if (storageArray[0] != null) {
            return storageArray
                .map((e) => {
                    return e.id;
                })
                .includes(id);
        }
    }
}
