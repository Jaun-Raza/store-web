import React from "react";
import styled from "styled-components";
import Sort from './components/Sort';
import FilterSection from './components/FilterSection';
import ProductList from "./components/ProductList";
import { useFilterContext } from "./context/FilterContext";

const Products = () => {

  const { filter_products, grid_view, setGridView, setListView, sorting, updateFilterValue, filters, all_products, clearFilters } = useFilterContext();

  const filterProducts = {
    filter_products: filter_products,
    grid_view: grid_view,
    setGridView: setGridView,
    setListView: setListView,
    sorting: sorting,
    updateFilterValue: updateFilterValue,
    filters: filters,
    all_products: all_products,
    clearFilters: clearFilters,
  }

  return <Wrapper>
    <div className="container grid grid-filter-column">
      <div>
        <FilterSection filterProducts={filterProducts} />
      </div>
      <section className="product-view--sort" >
        <div className="sort-filter">
          <Sort filterProducts={filterProducts} />
        </div>
        <div className="main-product">
          <ProductList filterProducts={filterProducts} />
        </div>
      </section>
    </div>
  </Wrapper>;
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
