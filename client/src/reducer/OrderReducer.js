const orderReducer = (state, action) => {
    switch (action.type) {
        case "GET_MY_ORDERS":
            const {cartArr, total_price, shipping_fee} = action.payload;

            const order = {
                cartArr: cartArr,
                total_price: total_price,
                shipping_fee: shipping_fee
            }

            return {
                ...state,
                myOrders: order
            }

        case "GET_SINGLE_ORDER": {
            const singleData = action.payload;

            return {
                ...state,
                singleOrder: singleData
            }
        }
            
    
        default:
            return state;
    }
} 

export default orderReducer;