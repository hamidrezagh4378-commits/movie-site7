import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CartPage from './pages/CartPage.jsx';
import Checkout from './pages/Checkout.jsx';
import WishlistPage, { OrderConfirmation } from './pages/WishlistOrder.jsx';
import Account from './pages/Account.jsx';
import { About, Contact, Faq, ShippingReturns, Privacy, Terms, JournalIndex, JournalArticle, NotFound } from './pages/Content.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Shell() {
  const { cartOpen } = useStore();
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <Header />
      <main id="main" style={{ minHeight: '50vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderConfirmation />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signin" element={<Account initialTab="signin" />} />
          <Route path="/register" element={<Account initialTab="register" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/journal" element={<JournalIndex />} />
          <Route path="/journal/:slug" element={<JournalArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      {cartOpen && <div className="visually-hidden" aria-live="polite">Bag opened</div>}
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
