import axios from "axios";
import Papa from "papaparse";

import {Product} from "./types";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        `https://docs.google.com/spreadsheets/d/e/2PACX-1vSwlmbAX7LzitQziUx28qz1Iq1O66-sroir0UI6bC2K4GOh_wcYE42zvKaHbEwIsbN3SquSmOgH28Y8/pub?output=csv`,
        {
          responseType: "blob",
        },
      )
      .then(
        (response) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[];

                return resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price),
                    stock: Number(product.stock),
                  })),
                );
              },
              error: (error) => reject(error.message),
            });
          }),
      );
  },
  mock: {
    list: (mock: string): Promise<Product[]> => import(`./mocks/${mock}.json`)
      .then((result) => result.default)
  }
};
