import * as React from "react";
import { GetStaticProps } from "next";

import { Product } from "../product/types";
import api from "../product/api";
import StoreScreen from "../product/screens/Store";

interface Props {
  products: Product[];
}



const IndexRoute: React.FC<Props> = ({ products }) => {
console.log(products);

  return (
    <StoreScreen products={products} />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products =  (await api.list()).filter(product=> product.stock > 0);

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default IndexRoute;
