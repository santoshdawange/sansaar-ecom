import axios from "axios";
import apiUrl from "../apiURL";
import { toast } from "react-toastify";

// Helper function to get a cookie by name
const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
};

export const getAuthHeaders = () => {
    // Get access_token from cookies
    const accessToken = getCookie('access_token');

    // Add Authorization header if token exists
    const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};

    return headers;
}

export const addUpdateCart = async (productId = "", productQty = "0", type="add", setCartData, redirectToCart) => {
    try {
        const cartData = {
            productId: productId,
            quantity: productQty
        };

        // Get the Authorization headers
        const headers = getAuthHeaders();

        // await api.addToCart(cartData);
        const response = await axios.post(apiUrl.cart.updateCart, cartData, { headers })  
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            localStorage.setItem('cartData', JSON.stringify(response.data.data));
            setCartData(response.data.data);
            if(productQty === 0) {
                toast.success('Product removed from cart successfully!');
            } else {
                toast.success(`${type === 'add' ? 'Product added to cart successfully!' : 'Cart updated successfully!'}`);
                if(redirectToCart)
                    window.location.href = window.location.origin + '/cart';
            }
            return response.data;
        }
    } catch (error) {
        toast.error('Error updating to cart, please try again');
        console.error("Error updating to cart:", error);
    }
}

export const getCart = async () => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // Pass headers as part of the options object
        const response = await axios.get(apiUrl.cart.getCart, { headers });
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            localStorage.setItem('cartData', JSON.stringify(response.data.data));
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}

export const applyRemoveCoupon = async (couponCode) => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // await api.addToCart(cartData);
        const response = await axios.get(apiUrl.cart.applyRemoveCouponCart(couponCode), { headers })  
        if (response.status === 200) {
            // console.log('coupon applied successfully', response.data);
            toast.success(couponCode === null ? 'Coupon removed successfully!' : response.data.data.price.message);
            localStorage.setItem('cartData', JSON.stringify(response.data.data));
            return response.data;
        }
    } catch (error) {
        toast.error('Not able to update coupon. Please try again.');
        console.error("Error updating to coupon on cart:", error);
    }
}

export const checkProductInCart = (productId) => {
    // console.log('productId', productId)
    if(productId) {
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        // console.log('cartData', cartData);
        if(cartData) {
            const productInCart = cartData?.cartItem.find(item => item.productId === productId);
            // console.log('productInCart', productInCart);
            return productInCart ? productInCart?.quantity : null;
        } else {
            return null;
        }
    }
    return null;
}

export const checkProductInWishlist = (productId) => {
    if(productId) {
        const wishlistData = JSON.parse(localStorage.getItem('wishlistData'));
        // console.log('wishlistData', wishlistData);
        if(wishlistData) {
            const productInWishlist = wishlistData?.wishList.find(item => item.id === productId);
            // console.log('productInWishlist', productInWishlist);
            return productInWishlist ? true : false;
        } else {
            return false;
        }
    }
    return false;
}

export const cartCheckout = async (shippingAddressId = "", billingAddressId = "") => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // Construct query parameters
        const params = {
            shippingAddressId: shippingAddressId,
            billingAddressId: billingAddressId,
        };

        // Make the GET request with query parameters
        const response = await axios.post(apiUrl.cart.cartCheckout, params, { headers });

        if (response.status === 200) {
            toast.success('Order placed successfully!');
            localStorage.removeItem('cartData');
            return true;
        }
    } catch (error) {
        toast.error('Error while placing order, please try again');
        console.error("Error during cart checkout:", error);
        return false;
    }
};

export const getWishlist = async () => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // await api.addToCart(cartData);
        const response = await axios.get(apiUrl.cart.getWishlist, { headers })  
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            localStorage.setItem('wishlistData', JSON.stringify(response.data.data));
            // setCartData(response.data.data);
            // toast.success('Product added to wishlist!');
            return response.data;
        }
    } catch (error) {
        toast.error('Error, please try again');
        console.error("Error:", error);
    }
}

export const addWishlist = async (productId = "", setWishlistData) => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // await api.addToCart(cartData);
        const response = await axios.get(apiUrl.cart.addRemoveFromWishlist(productId), { headers })  
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            localStorage.setItem('wishlistData', JSON.stringify(response.data.data));
            // setCartData(response.data.data);
            toast.success('Product added to wishlist!');
            if(setWishlistData) {
                setWishlistData(response.data.data);
            }
            return response.data;
        }
    } catch (error) {
        toast.error('Error, please try again');
        console.error("Error:", error);
    }
}

export const removeWishlist = async (productId = "", setWishlistData) => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // await api.addToCart(cartData);
        const response = await axios.delete(apiUrl.cart.addRemoveFromWishlist(productId), { headers })  
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            localStorage.setItem('wishlistData', JSON.stringify(response.data.data));
            // setCartData(response.data.data);
            toast.success('Product removed from wishlist!');
            if(setWishlistData) {
                setWishlistData(response.data.data);
            }
            return response.data;
        }
    } catch (error) {
        toast.error('Error, please try again');
        console.error("Error:", error);
    }
}

export const getAddresses = async () => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // Pass headers as part of the options object
        const response = await axios.get(apiUrl.address.getAddAddress, { headers });
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            localStorage.setItem('addresses', JSON.stringify(response.data.data));
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}

export const addAddress = async (payload) => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // Pass headers as part of the options object
        const response = await axios.post(apiUrl.address.getAddAddress, payload, { headers });
        console.log('response', response);
        if (response.data.success) {
            // console.log('cart fetched successfully', response.data);
            toast.success(response.data.message);
            localStorage.setItem('addresses', JSON.stringify(response.data.data));
            return true;
        }
        return false;
    } catch (error) {
        toast.error('Error adding address!');
        console.error("Error adding address:", error);
        return false;
    }
}

export const updateAddress = async (payload, addressId) => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // Pass headers as part of the options object
        const response = await axios.patch(apiUrl.address.updateAddress(addressId), payload, { headers });
        console.log('response', response);
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            toast.success(response.data.message);
            localStorage.setItem('addresses', JSON.stringify(response.data.data));
            return true;
        }
        return false;
    } catch (error) {
        toast.error('Error updating address!');
        console.error("Error updating address:", error);
        return false;
    }
}

export const makeAddDefault = async (addressId) => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        const payload = {
            "isDefault": true
        }

        // Pass headers as part of the options object
        const response = await axios.patch(apiUrl.address.makeAddDefault(addressId), payload, { headers });
        console.log('response', response);
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            toast.success(response.data.message);
            // localStorage.setItem('addresses', JSON.stringify(response.data.data));
            return true;
        }
        return false;
    } catch (error) {
        toast.error('Error updating address!');
        console.error("Error updating address:", error);
        return false;
    }
}

export const getCouponList = async () => {
    try {
        // Get the Authorization headers
        const headers = getAuthHeaders();

        // Pass headers as part of the options object
        const response = await axios.get(apiUrl.cart.getCouponList, { headers });
        if (response.status === 200) {
            // console.log('cart fetched successfully', response.data);
            // localStorage.setItem('cartData', JSON.stringify(response.data.data));
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}