// All products
export const allProducts = async (perPage: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/products?limit=${perPage}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Products details
export const productDetails = async (productId: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Related products
export const relatedProducts = async (category: string, perPage: number) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${perPage}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (searchString: string, perPage: number) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${searchString}$limit=${perPage}`,
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
