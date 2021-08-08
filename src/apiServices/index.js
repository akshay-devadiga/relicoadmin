import axios from "./axios";
export const getProducts = async () => {
    try {
      const response = await axios.get(`/products`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}


export const getDiscounts = async () => {
  try {
    const response = await axios.get(`/discounts`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getCustomers = async () => {
    try {
      const response = await axios.get(`/customers`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export const getGenders = async () => {
    try {
      const response = await axios.get(`/genders`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export const getCategories = async () => {
    try {
      const response = await axios.get(`/categories`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}
export const getSizes = async () => {
    try {
      const response = await axios.get(`/sizes`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export const getBrands = async () => {
    try {
      const response = await axios.get(`/brands`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}

export const getColors = async () => {
    try {
      const response = await axios.get(`/colors`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
}


export const getPricesById = async (productInventoryId) =>{
    try {
        const response = await axios.get(`/prices/${productInventoryId}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    
}

export const getCountries = async () => {
  try {
    const response = await axios.get(`/countries`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getOrderDetails = async () => {
  try {
    const response = await axios.get(`/orders`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const addProducts = async (product) => {
  try {
    const response = await axios.post(`/products`,product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

