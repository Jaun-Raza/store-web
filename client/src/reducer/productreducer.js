const productreducer = (state, action) => {

    switch (action.type) {
        case "SET-LOADING":
            return {
                ...state,
                isLoading: true
            };

        case "SET-API-DATA":

            const featureData = action.payload.filter((elem) => {
                return elem.featured === true;
            })

            return {
                ...state,
                isLoading: false,
                products: action.payload,
                featureproducts: featureData
            }

        case "API-ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            };

        case "SET-SINGLE-LOADING":
            return {
                ...state,
                isSingleLoading: true
            };

        case "SET-SINGLE-DATA" :
            return {
                ...state,
                isSingleLoading : false,
                singleproducts : action.payload
            }

        case "SET-SINGLE-ERROR":
            return {
                ...state,
                isSingleLoading: false,
                isError: true
            };

        default:
            return {
                ...state
            }
    }
    // eslint-disable-next-line
    return state;
}

export default productreducer;