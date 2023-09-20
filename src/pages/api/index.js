// pages/api/index.js

import data from '@data/products';

export default function handler(req, res) {
  // Get the current date
  const currentDate = new Date();

  // Add valid discount deadlines for products with existing discounts
  const productsWithValidDiscounts = data.map(product => {
    // Check if the product has a discount
    if (product.discount > 0) {
      // Generate a random future date for the discount deadline
      const randomFutureDate = new Date();
      randomFutureDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 30));

      // Update the product with the random discount deadline
      return {
        ...product,
        discountDuration: randomFutureDate.toISOString().split('T')[0],
      };
    }

    // Return the product without modifying it
    return product;
  });

  // Remove the "skin" attribute from each product
  const strippedProducts = productsWithValidDiscounts.map(({ skin, ...product }) => product);

  // Return the JSON response
  res.status(200).json(strippedProducts);
}
