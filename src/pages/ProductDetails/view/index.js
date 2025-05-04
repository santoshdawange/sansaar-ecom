import React, { useEffect, useState } from 'react';
import DetailMedia from './components/DetailMedia';
import DetailInfo from './components/DetailInfo';
import ProductSet from './components/ProductSet';
import Favourites from './components/Favourites';
import CustomerSupport from '@pages/Shop/view/components/CustomerSupport';
import { useParams } from 'react-router-dom';
import apiUrl from '@common/utils/apiURL';
import axios from 'axios';
import { checkProductInCart, getAuthHeaders, getCart, getCouponList } from '@common/utils/cart';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { slug } = useParams(); // Get the dynamic id from the route
  const [allProductsData, setAllProductsData] = useState([]);
  const [productData, setProductData] = useState({});
  const [productCartQty, setProductCartQty] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (slug) {
        // Fetch the product details using the id
        // You can use your API call here
        // console.log('Fetching product details for id:', slug);
        try {
          // Get the Authorization headers
          const headers = getAuthHeaders();

          const response = await axios.get(apiUrl.product.getSKUDetailsBySlug(slug), { headers });
          if (response.statusText === 'OK' || response.status === 200) {
            // console.log('Product details fetched successfully:', response.data.data);
            const selectedProduct = response.data.data.find((item) => item.slug === slug);
            // console.log('Selected Product:', selectedProduct);
            setAllProductsData(response.data.data);
            setSelectedSize(selectedProduct?.size);
            setSelectedShade(selectedProduct?.shade);
            setProductData(selectedProduct);
            peocessSizeData(response.data.data);
            processColotData(response.data.data);
            // setProductData(response.data.data);
            // console.log('checkProductInCart(response.data.data?.id)', selectedProduct?.id);
            setProductCartQty(checkProductInCart(selectedProduct?.id));
          } else {
            console.log('Error fetching data');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [slug]);
  
  // get cart details
  const [cartData, setCartData] = useState({});
  const [couponList, setCouponList] = useState([]);
  useEffect(() => {
      getCart()
      .then((response) => {
        // console.log('response', response);
        if (response.success) {
          setCartData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart details:', error);
        toast.error('Error fetching cart details:', error);
      });

      getCouponList()
      .then((response) => {
        // console.log('response', response);
        if (response.success) {
          const coupons = response.data;
          setCouponList(coupons)
          // console.log('Coupons fetched successfully:', coupons); setCouponList(coupons);
        } else {
          console.log('Error fetching coupon list');
        }
      })
      .catch((error) => {
        console.error('Error fetching coupon list:', error);
      });
  }, []);

  const [sizes, setSizes] = useState([]);
  const [shades, setShades] = useState([]);
  const peocessSizeData = (data) => {
    if (!data || !Array.isArray(data)) return [];
  
    // Extract all sizes into an array
    const sizes = data.map((item) => item.size).filter(Boolean); // Ensure size exists
  
    // Make the array unique
    const uniqueSizes = [...new Set(sizes)];
    setSizes(uniqueSizes);
    // console.log('Unique Sizes:', uniqueSizes);
    return uniqueSizes;
  };

  const processColotData = (data) => {
    if (!data || !Array.isArray(data)) return [];
  
    // Extract shade and imageUrl into an array of objects
    const shades = data
      .map((item) => ({
        shade: item.shade,
        imageUrl: item.imageUrl,
        slug: item.slug,
      }))
      .filter((item) => item.shade && item.imageUrl); // Ensure both shade and imageUrl exist
  
    // Make the array unique based on the shade value
    const uniqueShades = Array.from(
      new Map(shades.map((item) => [item.shade, item])).values()
    );
    setShades(uniqueShades);
    // console.log('Unique Shades:', uniqueShades);
    return uniqueShades;
  };

  useEffect(() => {
    if (selectedShade && selectedSize) {
      // Filter the product that matches both selectedShade and selectedSize
      const filteredProduct = allProductsData.find(
        (product) => product.shade === selectedShade && product.size === selectedSize
      );
  
      if (filteredProduct) {
        setProductData(filteredProduct); // Update the productData with the filtered product
        setProductCartQty(checkProductInCart(filteredProduct?.id));
      } else {
        toast.error('No product matches the selected shade and size');
      }
    }
  }, [selectedShade, selectedSize, allProductsData]);

  // console.log('productCartQty', productCartQty);
  return (
    <>
      {Object.keys(productData)?.length === 0 ? (
        <div className='bs-section'>
          <div className='bs-section__section-cont'>
            <h2>Please Wait ...</h2>
          </div>
        </div>
      ) : <>
        <div className='lyt-pdp'>
          {productData?.productImages?.length > 0 && (<>
            <div className='lyt-pdp__media-wrap'>
                <DetailMedia showCaseData={productData?.productImages}/>
            </div>
          </>)}
          <div className='lyt-pdp__info-wrap'>
              <DetailInfo 
                data={productData} 
                productCartQty={productCartQty} 
                setCartData={setCartData} 
                sizes={sizes} 
                shades={shades} 
                setSelectedSize={setSelectedSize}
                setSelectedShade={setSelectedShade}
                selectedSize={selectedSize}
                selectedShade={selectedShade}
                couponList={couponList}
                cartData={cartData}
              />
          </div>
        </div>
        {/* <div className='bs-section'>
          <div className='bs-section__section-cont'>
            <ProductSet/>
          </div>
        </div>
        <div className='bs-section cm-no-padding-horizontal bs-section--typ-left-full'>
          <div className='bs-section__section-cont'>
              <Favourites 
                gridGap={44}
                sectionTitle='upgrade your sleep'
                sectionSubTitle='make it a bedding set'
              />
          </div>
        </div> */}
        <div className='bs-section cm-no-padding-horizontal bs-section--typ-left-full'>
          <div className='bs-section__section-cont'>
              <Favourites 
                gridGap={44}
                sectionTitle='you may also like'
                sectionSubTitle='explore similar products'
              />
          </div>
        </div>
        <div className='bs-section bs-section--typ-grey bs-section--typ-customer-support'>
          <div className='bs-section__section-cont'>
            <CustomerSupport/>
          </div>
        </div>
      </>}
    </> 
  )
}

export default ProductDetails