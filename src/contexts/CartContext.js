import React, { useState, createContext } from 'react';

export const CartContext = createContext({});

function CartProvider({children}){
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

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
            totalResultCart(carList);
            //console.log([...cart])
            return;
        }

        let data = {
          ...newItem,
          amount: 1,
          total: newItem.price  
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])
        //console.log([...cart, data])
    }

    function removeItemCart(product){
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            let cartList = cart;

            cartList[indexItem].amount =   cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id);

        setCart(removeItem);
        totalResultCart(removeItem)
    }

    function totalResultCart(items){
        let myCart = items;
        let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0)

        setTotal(result.toFixed(2));
    }

    return(
        <CartContext.Provider
            value={{
                cart,
                addItemCart,
                removeItemCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

