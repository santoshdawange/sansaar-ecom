const BASE_URL = "https://sansaar.ainocular.com/api"
const BASE_URL_ECOM = "https://sansaar-ecom.ainocular.com/api"
// const BASE_URL_PROD = "https://sansaar.co.in/api/v1"

// const BASE_URL = process.env.REACT_APP_BACKEND_URL || "https://sansaar.co.in/api/v1";


const apiUrl = {
    auth: {
        login: `${BASE_URL_ECOM}/auth/sign-in`,
        register: `${BASE_URL_ECOM}/auth/sign-up`,
        refreshToken: `${BASE_URL_ECOM}/auth/refresh`,
        // logout: `${BASE_URL}/v1/auth/logout`
    },
    collection: {
        getAll: `${BASE_URL}/v1/collection/all`,
        getMaterials: (collectionId) => `${BASE_URL}/v1/collection/get-materials/${collectionId}`,
        getTrending: `${BASE_URL}/v1/collection/trending`
    },
    contactUs: `${BASE_URL}/v1/util/contact-form`,
    store: `${BASE_URL}/v1/store/get-all`,
    search: (searchTerm) => `${BASE_URL}/v1/util/search?q=${searchTerm}`,
    inspiredLiving: (articleType) => `${BASE_URL}/v1/article/by-type?type=${articleType}`,
    inspiredLivingSearch: (articleType, searchTerm) => `${BASE_URL}/v1/article/search?type=${articleType}&q=${searchTerm}`,
    // ecom
    shop: {
        getAllSKUs: (pageNo, pageSize, direction, orderBy) => `${BASE_URL_ECOM}/sku/get-all?page=${pageNo}&pageSize=${pageSize}&direction=${direction}&orderBy=${orderBy}`,
        getAllTimeFav: `${BASE_URL_ECOM}/sku/all-time-favorite`,
        getCollectionsList: `${BASE_URL_ECOM}/collection/get-list`,
        getCategoryList: `${BASE_URL_ECOM}/category/get-list`,
    },
    product: {
        getSKUDetailsBySlug: (slug) => `${BASE_URL_ECOM}/sku/by-slug/${slug}`,
        getSKUDetails: (skuId) => `${BASE_URL_ECOM}/sku/get-by-id?id=${skuId}`,
        getCollectionDetails: (collectionId) => `${BASE_URL_ECOM}/collection/get-detail?id=${collectionId}`,
        getCategoryDetails: (categoryId) => `${BASE_URL_ECOM}/category/get-detail?id=${categoryId}`,
        getFeaturedProducts: `${BASE_URL_ECOM}/sku/feature-product`,
    },
    cart: {
        getCart: `${BASE_URL_ECOM}/cart/get-cart`,
        updateCart: `${BASE_URL_ECOM}/cart/add-cart`,
        applyRemoveCouponCart: (coupon) => `${BASE_URL_ECOM}/cart/apply-coupon/${coupon}`,
        cartCheckout: `${BASE_URL_ECOM}/cart/order`,
        getWishlist: `${BASE_URL_ECOM}/user/wishlist`,
        addRemoveFromWishlist: (skuId) => `${BASE_URL_ECOM}/user/wishlist/${skuId}`,
        getCouponList: `${BASE_URL_ECOM}/cart/coupons`,
    },
    address: {
        getAddAddress: `${BASE_URL_ECOM}/user/address`,
        updateAddress: (addressId) => `${BASE_URL_ECOM}/user/address/${addressId}`,
        deleteAddress: (addressId) => `${BASE_URL_ECOM}/user/address/${addressId}`,
        makeAddDefault: (addressId) => `${BASE_URL_ECOM}/user/address/default/${addressId}`,
    }
};

export default apiUrl;