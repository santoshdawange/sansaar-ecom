import '../src/common/assets/styles/custom.scss';
import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "@common/components/ScrollToTop"
import Header from "./common/components/Header"
import Footer from "./common/components/Footer"
import Home from './pages/Home/view';
import Contact from './pages/Contact/view';
import OurJourney from './pages/OurJourney/view';
import PageLoader from './pages/Home/view/components/PageLoader';
import Collections from './pages/Collection/view';
import CollectionDetail from './pages/CollectionDetail/view';
import SkuDetail from './pages/SkuDetail/view';
import Faq from './pages/Faq/view';
import PrivacyPolicy from './pages/PrivacyPolicy/view';
import WhereToBuy from '@pages/WhereToBuy/view';
import Sustainability from './pages/Sustainability/view';
import TermsAndConditions from './pages/TermsAndConditions/view';
import QualityStandards from '@pages/QualityStandards/view';
import Search from '@pages/Search/view';
import InspiredLiving from '@pages/InspiredLiving/view';
import BlogListing from '@pages/InspiredLiving/view/components/BlogListing';
import BlogDetails from '@pages/BlogDetails/view';
import ProductListing from '@pages/ProductListing/view';
import Shop from '@pages/Shop/view';
import ProductDetails from '@pages/ProductDetails/view';
import Cart from '@pages/Cart/view';
import Profile from '@pages/Profile/view';
import Addressess from '@pages/Adressess/view';
import MyWishlist from '@pages/MyWishlist/view';
import MyOrders from '@pages/MyOrders/view';
import Toaster from '@common/components/Toaster';

const MainContainer = ({ children }) => {
  const location = useLocation();
  
  const getClassForRoute = () => {
    return location.pathname.includes('collections') ? 'lyt-content__tpl-collection' : location.pathname.includes('plp') || location.pathname.includes('pdp') ? 'lyt-content__plp' : ''
  };

  return (
    <div className={`lyt-content ${getClassForRoute()}`}>
      {children}
    </div>
  );
}


function App() {

  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    },[])

  return (
    isLoading && window.location.pathname === '/' ? (
      <PageLoader/>
  ) : (
    <Router>
      <ScrollToTop />
      <div>
        <Header />
        <main>
          <MainContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/our-journey" element={<OurJourney />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collection-detail" element={<CollectionDetail />} />
              <Route path="/sku-detail" element={<SkuDetail />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/where-to-buy" element={<WhereToBuy />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/quality-standards" element={<QualityStandards />} />
              <Route path="/tnc" element={<TermsAndConditions />} />
              <Route path="/search" element={<Search />} />
              <Route path="/inspired-living" element={<InspiredLiving />} />
              <Route path="/blogs" element={<BlogListing />} />
              <Route path="/blog-details" element={<BlogDetails />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product-description/:slug" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-addresses" element={<Addressess />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/my-wishlist" element={<MyWishlist />} />
            </Routes>
          </MainContainer>
        </main>
        <Footer/>
        <Toaster /> {/* Add the Toaster component here */}
      </div>
    </Router>
  )
  );
}

export default App;
