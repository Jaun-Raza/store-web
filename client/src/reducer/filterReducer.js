const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":

            const priceArr = action.payload.map((currElem) => currElem.price);

            const maxPrice = Math.max(...priceArr);

            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice }
            };

        case "SET_GRIDVIEW":
            return {
                ...state,
                grid_view: true,
            }

        case "SET_LISTVIEW":
            return {
                ...state,
                grid_view: false,
            }

        case "GET_SORT_VALUE":
            return {
                ...state,
                sorting_value: action.payload,
            }

        case "SORTING_PRODUCT":
            let newSortData;
            const { filter_products } = state;
            let tempSortProduct = [...filter_products];

            function sortProducts(a, b) {
                if (state.sorting_value === "lowest") { return a.price - b.price }
                if (state.sorting_value === "highest") { return b.price - a.price }
                if (state.sorting_value === "a-z") { return a.name.localeCompare(b.name) }
                if (state.sorting_value === "z-a") { return b.name.localeCompare(a.name) }
            }

            newSortData = tempSortProduct.sort(sortProducts);

            return {
                ...state,
                filter_products: newSortData
            }

        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload;


            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value,
                }
            }

        case "FILTER_PRODUCTS":
            let { all_products } = state;
            let tempFilterProducts = [...all_products];

            const { text, category, company, colors, price } = state.filters;

            if (text) {
                tempFilterProducts = tempFilterProducts.filter((currElem) => {
                    return currElem.name.toLowerCase().includes(text);
                })
            }

            if (category) {
                if (category === "all") {
                    tempFilterProducts = tempFilterProducts.filter((currElem) => {
                        return currElem
                    })
                } else {
                    tempFilterProducts = tempFilterProducts.filter((currElem) => {
                        return currElem.category === category;
                    })
                }
            }

            if (company) {
                if (company === "all") {
                    tempFilterProducts = tempFilterProducts.filter((currElem) => {
                        return currElem
                    })
                } else {
                    tempFilterProducts = tempFilterProducts.filter((currElem) => {
                        return currElem.company === company;
                    })
                }
            }

            if (colors) {
                if (colors === "all") {
                    tempFilterProducts = tempFilterProducts.filter((currElem) => {
                        return currElem
                    })
                } else {
                    tempFilterProducts = tempFilterProducts.filter((currElem) => {
                        return currElem.colors.includes(colors);
                    })
                }
            }

            if (price === 0) {
                tempFilterProducts = tempFilterProducts.filter((currElem) => {
                    return currElem.price == price;
                })
            }else {
                tempFilterProducts = tempFilterProducts.filter((currElem) => {
                    return currElem.price <= price;
                })
            }


            return {
                ...state,
                filter_products: tempFilterProducts
            }

        case "CLEAR_FILTERS":
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    category: "all",
                    company: "all",
                    colors: "all",
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: state.filters.maxPrice,
                },
            }

        default: return state
    }
}

export default filterReducer;