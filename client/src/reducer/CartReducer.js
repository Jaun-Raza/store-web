const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let { id, activeColor, amount, products } = action.payload;


            // Check if product already exists in the cart
            const existingProduct = state.cart.find((currElem) => currElem.id == id + activeColor);

            if (existingProduct) {
                let updatedProduct = state.cart.map((currElem) => {
                    if (currElem.id == id + activeColor) {
                        let newAmount = currElem.amount + amount;

                        if (newAmount >= currElem.max) {
                            newAmount = currElem.max
                        }

                        return {
                            ...currElem,
                            amount: newAmount
                        }
                    } else {
                        return currElem
                    }
                });

                return {
                    ...state,
                    cart: updatedProduct
                }

            } else {

                var cartItem;

                cartItem = {
                    id: id + activeColor,
                    name: products.name,
                    color: activeColor,
                    amount,
                    image: products.image[0].url,
                    price: products.price,
                    max: products.stock
                }

                return {
                    ...state,
                    cart: [...state.cart, cartItem]
                }
            }


        case "REMOVE_FROM_CART":
            let elemId = action.payload;
            const { cart } = state
            let tempCartData = [...cart];

            if (elemId) {
                tempCartData = tempCartData.filter((currElem) => {
                    return currElem.id !== elemId
                });
            }

            return {
                ...state,
                cart: tempCartData
            }

        case "CLEAR_BTN":
            return {
                ...state,
                cart: []
            }

        case "INCREASE":
            let inID = action.payload;

            let increaseProduct = state.cart.map((currElem) => {
                if (currElem.id == inID) {
                    let newinVal;

                    if (currElem.amount < currElem.max) {
                        newinVal = currElem.amount + 1
                    }else {
                        newinVal = currElem.max
                    }

                    return {
                        ...currElem,
                        amount: newinVal
                    }

                    
                } else {
                    return currElem
                }
            });

            return {
                ...state,
                cart: increaseProduct
            }

        case "DECREASE":
            let deID = action.payload;

            let decreaseProduct = state.cart.map((currElem) => {
                if (currElem.id == deID) {
                    let newinVal;

                    if (currElem.amount > 1) {
                        newinVal = currElem.amount - 1
                    }else {
                        newinVal = 1
                    }

                    return {
                        ...currElem,
                        amount: newinVal
                    }

                    
                } else {
                    return currElem
                }
            });

            return {
                ...state,
                cart: decreaseProduct
            }

            case "SET_ITEM_VAL" : 
                let updatedVal = state.cart.reduce((initialVal, currElem) => {
                    let { amount } = currElem;

                    initialVal = initialVal + amount;
                    return initialVal;
                }, 0)

            return {
                ...state,
                total_item: updatedVal
            }

            case "SET_SUB_TOTAL": 
                let updatedSubVal = state.cart.reduce((initialVal, currElem) => {
                    let { amount , price} = currElem;
                    let subtotal = amount * price

                    initialVal = initialVal + subtotal;
                    return initialVal;
                }, 0)

                return {
                    ...state,
                    total_price: updatedSubVal,
                }

        default:
            return state
    }
};

export default cartReducer;
