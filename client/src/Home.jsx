import React, { useEffect } from 'react';
import Herosection from './components/Herosection';
import Trusted from './components/Trusted';
import Services from './components/Services';
import FeatureProducts from './components/FeatureProducts';
import { useProductContext } from "./context/productcontext";

const Home = () => {

  const { isLoading, featureproducts } = useProductContext();

  const featureData = {
    isLoading: isLoading,
    featureproducts: featureproducts
  }


  return (
    <>
      <Herosection heroHeading='Raza Store' />
      <FeatureProducts featureData={featureData} />
      <Services />
      <Trusted />
    </>
  )
}

export default Home

