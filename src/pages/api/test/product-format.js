import { getSession } from "next-auth/react";
import products from "@data/products/index-before-rm-sizes.json";


export default async function handler(req, res) {
    // Get the user session
    const session = await getSession({ req });

    // Ensure the user is authenticated
    if (!session) {
      return res.status(401).json({ error: "Unauthorized. User not authenticated." });
    }

    // return res.status(200).send(products);

    // create an array to store formated products
    let formatedProducts = [];
    products.forEach(p => {
        delete p.materials;
      
        if (p.variations) {
          p.variations.forEach(v => {
            p.material = {
              name: v.materials[0].name,
              slug: v.materials[0].slug,
              thumb: v.materials[0].thumb
            }
            p.price = v.materials[0].price;
            delete v.materials;
          });
        } else {
          console.error("Product with no variations!");
        }
      
        formatedProducts.push(p);
      });

    return res.status(200).send(formatedProducts);
};
