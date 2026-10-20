import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { PRODUCTS, productById, variantPrice, productBySlug } from '../data/catalog.js';
import { COUPONS, SITE } from '../data/content.js';

const StoreContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('lb_cart', []));
  const [wishlist, setWishlist] = useState(() => load('lb_wishlist', []));
  const [recent, setRecent] = useState(() => load('lb_recent', []));
  const [orders, setOrders] = useState(() => load('lb_orders', []));
  const [user, setUser] = useState(() => load('lb_user', null));
  const [coupon, setCoupon] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => localStorage.setItem('lb_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('lb_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('lb_recent', JSON.stringify(recent)), [recent]);
  useEffect(() => localStorage.setItem('lb_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('lb_user', JSON.stringify(user)), [user]);

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = productById(item.productId);
          if (!product) return null;
          const variant = product.variants?.find((v) => v.id === item.variantId) || product.variants?.[0];
          const unitPrice = variantPrice(product, item.variantId);
          const inStock = product.stock > 0;
          const maxQty = Math.min(product.stock, 99);
          return { ...item, product, variant, unitPrice, lineTotal: unitPrice * item.qty, inStock, maxQty, overStock: item.qty > product.stock };
        })
        .filter(Boolean),
    [cart]
  );

  const subtotal = cartDetailed.reduce((s, i) => s + i.lineTotal, 0);
  const discount = coupon && coupon.type === 'percent' ? subtotal * coupon.value : 0;
  const itemCount = cartDetailed.reduce((s, i) => s + i.qty, 0);

  const addToCart = useCallback((product, variantId, qty = 1, { openDrawer = true } = {}) => {
    const id = variantId || product?.variants?.[0]?.id || null;
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id && (i.variantId || null) === (id || null));
      const currentQty = existing ? existing.qty : 0;
      const maxQty = Math.min(product.stock, 99);
      const newQty = Math.min(currentQty + qty, maxQty);
      if (existing) return prev.map((i) => (i === existing ? { ...i, qty: newQty } : i));
      return [...prev, { productId: product.id, variantId: id, qty: newQty }];
    });
    if (openDrawer) setCartOpen(true);
  }, []);

  const setQty = useCallback((productId, variantId, qty) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && (i.variantId || null) === (variantId || null)
            ? { ...i, qty: Math.max(1, Math.min(qty, 99)) }
            : i
        )
        .filter((i) => {
          if (i !== undefined && i.productId === productId && (i.variantId || null) === (variantId || null)) {
            const p = productById(productId);
            return p && i.qty <= p.stock;
          }
          return true;
        })
    );
  }, []);

  const removeFromCart = useCallback((productId, variantId) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && (i.variantId || null) === (variantId || null))));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((x) => x !== productId) : [...prev, productId]));
  }, []);

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist]);

  const viewProduct = useCallback((id) => {
    setRecent((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const applyCoupon = useCallback((code) => {
    const c = COUPONS[code.trim().toUpperCase()];
    if (!c) return { ok: false, message: 'This promotional code is not valid.' };
    setCoupon({ code: code.trim().toUpperCase(), ...c });
    return { ok: true, message: c.label };
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const placeOrder = useCallback(
    (info) => {
      const order = {
        id: `LB-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        status: 'Confirmed (demo)',
        items: cartDetailed.map((i) => ({
          productId: i.productId, name: i.product.name, brand: i.product.brand,
          variant: i.variant?.name || null, qty: i.qty, unitPrice: i.unitPrice,
        })),
        totals: { subtotal, discount, shipping: info.shippingCost, total: subtotal - discount + info.shippingCost },
        info: {
          name: info.name, email: info.email, phone: info.phone,
          address: `${info.address}, ${info.city} ${info.postal}, ${info.country}`,
          delivery: info.delivery, payment: info.payment,
        },
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      setCoupon(null);
      return order;
    },
    [cartDetailed, subtotal, discount]
  );

  const signIn = useCallback((name, email) => {
    const u = { name, email };
    setUser(u);
    return u;
  }, []);
  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({
      cart, cartDetailed, subtotal, discount, itemCount, coupon,
      addToCart, setQty, removeFromCart, clearCart,
      wishlist, toggleWishlist, isWishlisted,
      recent, viewProduct, orders, placeOrder,
      user, signIn, signOut,
      applyCoupon, removeCoupon,
      cartOpen, setCartOpen,
    }),
    [cart, cartDetailed, subtotal, discount, itemCount, coupon, addToCart, setQty, removeFromCart, clearCart, wishlist, toggleWishlist, isWishlisted, recent, viewProduct, orders, placeOrder, user, signIn, signOut, applyCoupon, removeCoupon, cartOpen]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
export { PRODUCTS, productBySlug };
