import React, { useState, createContext } from 'react';

export const CartContext = createContext({});

function CartProvider({children}){
    const [cart, setCart] = useState([]);

    function addItemCart(newItem){
        //ver se o item já esta no carrinho e ai adicionamos +1 quantidade
        //se ele não estiver adicionar o item

        const indexItem = cart.findIndex(item => item.id === newItem.id)//percorrendo toda a lista e devolvendo a posição do item. Se ele não encontrar devolve -1

        if(indexItem !== -1){
            //se entrou aqui temos que adicionar mais uma quantiodade pois ele ja esta na lista
            let carList = cart;
            carList[indexItem].amount =  carList[indexItem].amount + 1;

            carList[indexItem].total = carList[indexItem].amount * carList[indexItem].price;

            setCart(carList);
            console.log([...cart])
            return;
        }

        let data = {
          ...newItem,
          amount: 1,
          total: newItem.price  
        }

        setCart(products => [...products, data])
        console.log([...cart, data])
    }

    return(
        <CartContext.Provider
            value={{
                cart,
                addItemCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

