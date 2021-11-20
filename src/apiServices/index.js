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


export const getPricesById = async (productId) =>{
    try {
        const response = await axios.get(`/prices/${productId}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    
}

export const getSizesById = async (productId) =>{
  try {
      const response = await axios.get(`/sizes/${productId}`);
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

export const updateProducts = async (product) => {
  try {
    const response = await axios.put(`/products`,product);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const uploadFile = async (files) => {
  try {
    let config = {
      header : {
       'Content-Type' : 'multipart/form-data'
     }
    }
    const response = await axios.post(`/upload`,files,config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const removeFile = async (fileName) => {
  try {
    const response = await axios.post(`/removeFile`,{fileName});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const uploadPanelFile = async (files) => {
  try {
    let config = {
      header : {
       'Content-Type' : 'multipart/form-data'
     }
    }
    const response = await axios.post(`/panel-upload`,files,config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const getCarouselImages = async () => {
  try {
    const response = await axios.get(`/carouselImages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPanelImages = async () => {
  try {
    const response = await axios.get(`/panelImages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getOfferImages = async () => {
  try {
    const response = await axios.get(`/offerImages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const updateCarouselImages = async (imageOb) => {
  try {
    const response = await axios.put(`/updateCarouselImages`,imageOb);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updatePanelImages = async (imageOb) => {
  try {
    const response = await axios.put(`/updatePanelImages`,imageOb);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const updateOfferImages = async (imageOb) => {
  try {
    const response = await axios.put(`/updateOfferImages`,imageOb);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
