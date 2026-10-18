/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CartItem, 
  InventoryItem, 
  Order, 
  Product, 
  ReturnInspection, 
  ReviewItem,
  OccasionType,
  ReturnReviewRequest 
} from './types';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { INITIAL_REVIEWS } from './data/mockReviews';
import { INITIAL_RETURN_REQUESTS } from './data/mockReturnRequests';
import { Navbar, CITIES } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OccasionSelector } from './components/OccasionSelector';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrdersTrackerView } from './components/OrdersTrackerView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { DatabaseView } from './components/DatabaseView';
import { HowItWorksSection } from './components/HowItWorksSection';
import { HygieneSafetySection } from './components/HygieneSafetySection';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ReviewModal } from './components/ReviewModal';
import { ShopView } from './components/ShopView';
import { StaffPinGate } from './components/StaffPinGate';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  ShoppingBag, 
  Heart, 
  Database, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { addDays, formatINR } from './utils/rentalCalculations';

// Initial Mock Inventory
const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    productId: 'prod-01',
    productName: 'Emerald Green Designer Zardozi Lehenga',
    category: 'Lehenga',
    size: 'M',
    sku: 'SR-LHN-01-M',
    status: 'Rented',
    currentOrderId: 'SR-10842',
    nextAvailableDate: '2026-10-30',
    location: 'Mumbai-Hub-Rack-A4',
  },
  {
    id: 'inv-02',
    productId: 'prod-01',
    productName: 'Emerald Green Designer Zardozi Lehenga',
    category: 'Lehenga',
    size: 'L',
    sku: 'SR-LHN-01-L',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Mumbai-Hub-Rack-A5',
  },
  {
    id: 'inv-03',
    productId: 'prod-02',
    productName: 'Royal Maroon Embroidered Silk Sherwani',
    category: 'Sherwani',
    size: 'L',
    sku: 'SR-SHW-02-L',
    status: 'Cleaning',
    nextAvailableDate: '2026-10-21',
    location: 'DryClean-Hub-Zone2',
  },
  {
    id: 'inv-04',
    productId: 'prod-02',
    productName: 'Royal Maroon Embroidered Silk Sherwani',
    category: 'Sherwani',
    size: 'XL',
    sku: 'SR-SHW-02-XL',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Delhi-Hub-Bay-B1',
  },
  {
    id: 'inv-05',
    productId: 'prod-05',
    productName: 'Crimson Banarasi Katan Silk Heritage Saree',
    category: 'Saree',
    size: 'M',
    sku: 'SR-SAR-05-M',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Bengaluru-Hub-Bay-C1',
  },
  {
    id: 'inv-06',
    productId: 'prod-06',
    productName: 'Champagne Gold Sequin Floor-Length Gown',
    category: 'Gown',
    size: 'S',
    sku: 'SR-GWN-06-S',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Pune-Hub-Bay-D2',
  },
  {
    id: 'inv-07',
    productId: 'prod-07',
    productName: 'Midnight Black Velvet Bandhgala Jodhpuri Suit',
    category: 'Blazer & Tuxedo',
    size: 'L',
    sku: 'SR-TUX-07-L',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Mumbai-Hub-Rack-C2',
  },
  {
    id: 'inv-08',
    productId: 'prod-08',
    productName: 'Sunshine Mustard Yellow Georgette Anarkali',
    category: 'Anarkali',
    size: 'M',
    sku: 'SR-ANK-08-M',
    status: 'Available',
    nextAvailableDate: '2026-10-18',
    location: 'Thane-Hub-Bay-E1',
  },
];

// Initial Mock Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-801',
    orderNumber: 'SR-10842',
    createdAt: '2026-10-10T14:30:00.000Z',
    customer: {
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      phone: '9820144521',
      address: 'Flat 402, Sea Green Apartments, Worli Sea Face',
      city: 'Mumbai',
      pincode: '400018',
    },
    items: [
      {
        cartItemId: 'item-801',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'M',
        rentalDuration: '3_days',
        rentalDays: 3,
        startDate: '2026-10-25',
        deliveryDate: '2026-10-24',
        returnDate: '2026-10-28',
        rentalFee: 1999,
        securityDeposit: 2500,
        fittingOption: 'custom',
        backupOption: 'backup_size',
        backupSize: 'L',
        backupPrice: 399,
        damageProtection: true,
        damageProtectionPrice: 299,
      },
    ],
    identityVerification: {
      type: 'Aadhaar',
      idNumberMasked: 'XXXX-XXXX-4819',
      verified: true,
      verificationDate: '10 Oct 2026',
    },
    payment: {
      method: 'UPI',
      upiProvider: 'PhonePe',
      transactionId: 'TXN_98102381',
      status: 'Paid',
    },
    pricing: {
      rentalSubtotal: 1999,
      securityDepositTotal: 2500,
      backupOptionsTotal: 399,
      damageProtectionTotal: 299,
      deliveryFee: 0,
      grandTotal: 5197,
    },
    orderStatus: 'Delivered',
    returnBagTracking: 'DELHIVERY-RT-981023',
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', timestamp: '10 Oct, 02:30 PM', description: 'Booking confirmed.', completed: true, current: false },
      { status: 'Preparing', label: 'UV-C Sanitized', timestamp: '12 Oct, 11:00 AM', description: 'Dry cleaned & ironed.', completed: true, current: false },
      { status: 'Dispatched', label: 'Dispatched', timestamp: '13 Oct, 09:30 AM', description: 'Courier transit with reusable bag.', completed: true, current: false },
      { status: 'Delivered', label: 'Delivered', timestamp: '14 Oct, 01:15 PM', description: 'Received in sealed garment bag.', completed: true, current: true },
      { status: 'Returned', label: 'Return Scheduled', timestamp: '28 Oct', description: 'Courier collects bag.', completed: false, current: false },
      { status: 'Inspected & Refunded', label: 'Deposit Refund', timestamp: '29 Oct', description: '100% deposit returned to UPI.', completed: false, current: false },
    ],
  },
  {
    id: 'ord-802',
    orderNumber: 'SR-10855',
    createdAt: '2026-10-15T18:15:00.000Z',
    customer: {
      fullName: 'Rohan Mehra',
      email: 'rohan.mehra@example.com',
      phone: '9811233490',
      address: 'B-14, Greater Kailash 1',
      city: 'Delhi NCR',
      pincode: '110048',
    },
    items: [
      {
        cartItemId: 'item-802',
        product: INITIAL_PRODUCTS[1],
        selectedSize: 'L',
        rentalDuration: '3_days',
        rentalDays: 3,
        startDate: '2026-10-28',
        deliveryDate: '2026-10-27',
        returnDate: '2026-10-31',
        rentalFee: 1499,
        securityDeposit: 2000,
        fittingOption: 'standard',
        backupOption: 'none',
        backupPrice: 0,
        damageProtection: true,
        damageProtectionPrice: 299,
      },
    ],
    identityVerification: {
      type: 'PAN',
      idNumberMasked: 'ABCDE7890F',
      verified: true,
      verificationDate: '15 Oct 2026',
    },
    payment: {
      method: 'UPI',
      upiProvider: 'GooglePay',
      transactionId: 'TXN_98102450',
      status: 'Paid',
    },
    pricing: {
      rentalSubtotal: 1499,
      securityDepositTotal: 2000,
      backupOptionsTotal: 0,
      damageProtectionTotal: 299,
      deliveryFee: 0,
      grandTotal: 3798,
    },
    orderStatus: 'Preparing',
    returnBagTracking: 'DELHIVERY-RT-981045',
    timeline: [
      { status: 'Confirmed', label: 'Order Confirmed', timestamp: '15 Oct, 06:15 PM', description: 'Garment reserved.', completed: true, current: false },
      { status: 'Preparing', label: 'Sanitizing & Ironing', timestamp: 'In progress', description: 'Hospital grade sterilization.', completed: true, current: true },
      { status: 'Dispatched', label: 'Dispatched', timestamp: 'Scheduled 26 Oct', description: 'With reusable bag.', completed: false, current: false },
      { status: 'Delivered', label: 'Doorstep Delivered', timestamp: 'Scheduled 27 Oct', description: 'Try on guarantee.', completed: false, current: false },
      { status: 'Returned', label: 'Return Pickup', timestamp: 'Scheduled 31 Oct', description: 'Pickup morning after.', completed: false, current: false },
      { status: 'Inspected & Refunded', label: 'Deposit Refunded', timestamp: 'Scheduled 01 Nov', description: 'Security deposit released.', completed: false, current: false },
    ],
  },
];

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database'>('home');
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOccasionForShop, setSelectedOccasionForShop] = useState<OccasionType | 'All'>('All');

  // Admin & Database PIN Gate Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [showPinGate, setShowPinGate] = useState<boolean>(false);
  const [targetProtectedSection, setTargetProtectedSection] = useState<'admin' | 'database'>('admin');

  // Verify existing admin session token with server on initial load
  useEffect(() => {
    const token = sessionStorage.getItem('style_rent_admin_token');
    if (token) {
      fetch('/api/admin/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setIsAdminAuthenticated(true);
          } else {
            sessionStorage.removeItem('style_rent_admin_token');
            setIsAdminAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, []);

  // Listen to direct URL hash/query changes (e.g. #admin, #database, ?tab=admin)
  useEffect(() => {
    const handleUrlChange = () => {
      const hash = window.location.hash.replace('#', '');
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const target = (hash || tabParam) as any;

      if (target === 'admin' || target === 'database') {
        const token = sessionStorage.getItem('style_rent_admin_token');
        if (!token) {
          // Block direct URL access: require PIN authentication first
          setTargetProtectedSection(target);
          setShowPinGate(true);
          setActiveTab('home');
        } else {
          setActiveTab(target);
        }
      } else if (['home', 'shop', 'how-it-works', 'hygiene', 'orders'].includes(target)) {
        setActiveTab(target);
      }
    };

    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    return () => window.removeEventListener('hashchange', handleUrlChange);
  }, []);

  // Persistence State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('style_rent_products');
    if (saved) {
      try {
        const parsed: Product[] = JSON.parse(saved);
        // Sync with latest non-repetitive images while preserving user order count & bookings
        return parsed.map((p) => {
          const fresh = INITIAL_PRODUCTS.find((init) => init.id === p.id);
          return fresh ? { ...p, images: fresh.images } : p;
        });
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('style_rent_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('style_rent_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('style_rent_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [inspections, setInspections] = useState<ReturnInspection[]>(() => {
    const saved = localStorage.getItem('style_rent_inspections');
    return saved ? JSON.parse(saved) : [];
  });

  const [returnRequests, setReturnRequests] = useState<ReturnReviewRequest[]>(() => {
    const saved = localStorage.getItem('style_rent_return_requests');
    return saved ? JSON.parse(saved) : INITIAL_RETURN_REQUESTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('style_rent_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('style_rent_wishlist');
    return saved ? JSON.parse(saved) : ['prod-01', 'prod-03'];
  });

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('style_rent_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('style_rent_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('style_rent_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('style_rent_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('style_rent_inspections', JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem('style_rent_return_requests', JSON.stringify(returnRequests));
  }, [returnRequests]);

  useEffect(() => {
    localStorage.setItem('style_rent_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('style_rent_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId) 
        : [...prev, productId]
    );
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Tab navigation with PIN protection gate for Admin and Database
  const handleNavigateTab = (tab: 'home' | 'shop' | 'how-it-works' | 'hygiene' | 'orders' | 'admin' | 'database') => {
    if (tab === 'admin' || tab === 'database') {
      if (!isAdminAuthenticated) {
        setTargetProtectedSection(tab);
        setShowPinGate(true);
        return;
      }
    }
    setActiveTab(tab);
    window.location.hash = tab;
  };

  // Admin Logout: Invalidates token with server and locks access again
  const handleAdminLogout = async () => {
    const token = sessionStorage.getItem('style_rent_admin_token');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch (err) {
        // Continue logout locally even if offline
      }
    }
    sessionStorage.removeItem('style_rent_admin_token');
    setIsAdminAuthenticated(false);
    setShowPinGate(false);
    if (activeTab === 'admin' || activeTab === 'database') {
      setActiveTab('home');
      window.location.hash = 'home';
    }
  };

  // Order Placement & Inventory Booking Sync
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart
    setConfirmedOrder(newOrder); // Open confirmation modal

    // Notify backend server so that every product ordered is recorded as a new row on server
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch((err) => {
      console.error('Error recording order to server:', err);
    });

    // Update Product existingBookings & Operational Buffer & Order Tracking Columns!
    setProducts((prev) => 
      prev.map((p) => {
        const matchingItem = newOrder.items.find((item) => item.product.id === p.id);
        if (matchingItem) {
          const bufferStart = addDays(matchingItem.startDate, -2);
          const bufferEnd = addDays(matchingItem.returnDate, 2);
          return {
            ...p,
            totalOrdersCount: (p.totalOrdersCount || 0) + 1,
            lastOrderedAt: new Date().toLocaleString('en-IN'),
            latestOrderId: newOrder.orderNumber,
            existingBookings: [
              ...p.existingBookings,
              {
                startDate: matchingItem.startDate,
                endDate: matchingItem.returnDate,
                bufferStart,
                bufferEnd,
                orderId: newOrder.orderNumber,
              },
            ],
          };
        }
        return p;
      })
    );

    // Update Inventory Unit status to 'Rented'
    setInventory((prev) => 
      prev.map((unit) => {
        const matchingItem = newOrder.items.find((item) => item.product.id === unit.productId && item.selectedSize === unit.size);
        if (matchingItem && unit.status === 'Available') {
          return {
            ...unit,
            status: 'Rented',
            currentOrderId: newOrder.orderNumber,
            nextAvailableDate: addDays(matchingItem.returnDate, 2),
          };
        }
        return unit;
      })
    );
  };

  // Express 1-click rent now: sets item to cart and directly triggers checkout
  const handleRentNow = (item: CartItem) => {
    setCart([item]);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Admin order status update
  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) => 
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  // Admin inventory status update
  const handleUpdateInventoryStatus = (itemId: string, newStatus: any) => {
    setInventory((prev) => 
      prev.map((i) => (i.id === itemId ? { ...i, status: newStatus } : i))
    );
  };

  // Customer Return, Exchange & Refund Review submission
  const handleCreateReturnRequest = (newRequest: ReturnReviewRequest) => {
    setReturnRequests((prev) => [newRequest, ...prev]);
  };

  // Admin Inspection of Customer Return & Damage Review
  const handleAdminInspectReturnRequest = (
    requestId: string,
    inspectionData: {
      assessedCondition: string;
      damageChargeDeducted: number;
      finalRefundAmount: number;
      actionTaken: 'refund_processed' | 'exchange_approved' | 'rejected';
      adminNotes: string;
      inspectorStaff: string;
    }
  ) => {
    setReturnRequests((prev) =>
      prev.map((r) => {
        if (r.id === requestId) {
          const newStatus = inspectionData.actionTaken === 'exchange_approved'
            ? 'Exchange Approved'
            : inspectionData.actionTaken === 'refund_processed'
              ? 'Approved & Refunded'
              : 'Rejected';
          return {
            ...r,
            status: newStatus,
            adminInspection: {
              inspectedAt: new Date().toISOString(),
              inspectorStaff: inspectionData.inspectorStaff,
              assessedCondition: inspectionData.assessedCondition,
              damageChargeDeducted: inspectionData.damageChargeDeducted,
              finalRefundAmount: inspectionData.finalRefundAmount,
              actionTaken: inspectionData.actionTaken,
              adminNotes: inspectionData.adminNotes,
              payoutTransactionId: `UPI_REF_${Date.now().toString().slice(-6)}`,
            },
          };
        }
        return r;
      })
    );
  };

  // Admin Return Inspection
  const handleProcessInspection = (inspection: ReturnInspection) => {
    setInspections((prev) => [inspection, ...prev]);
    // Set inventory item to 'Cleaning' then 'Available'
    setInventory((prev) => 
      prev.map((unit) => 
        unit.productId === inspection.productId ? { ...unit, status: 'Cleaning' } : unit
      )
    );
  };

  // User review submission
  const handleAddReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  const featuredProducts = products.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 font-sans selection:bg-[#6B1D2F] selection:text-white">
      
      {/* Universal Navbar with Protected Status and Logout Control */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        cartCount={cart.length}
        wishlistCount={wishlistIds.length}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        isStaffAuthorized={isAdminAuthenticated}
        onLockStaff={handleAdminLogout}
      />

      {/* Main Content Router */}
      <div className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onExploreShop={() => handleNavigateTab('shop')}
              onHowItWorks={() => handleNavigateTab('how-it-works')}
              onOpenDatabase={() => handleNavigateTab('database')}
            />

            {/* Occasion Browser */}
            <OccasionSelector
              selectedOccasion={selectedOccasionForShop}
              onSelectOccasion={(occ) => {
                setSelectedOccasionForShop(occ);
                setActiveTab('shop');
              }}
            />

            {/* Featured Outfits Section */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs uppercase font-bold text-[#8C6D46] tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E6CA85]" />
                    <span>Curated Couture</span>
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                    Trending Bridal & Reception Fits
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                    Handcrafted zardozi lehengas, silk sherwanis, and cocktail gowns ready for dispatch.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('shop')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B1D2F] hover:text-[#521321] transition-colors group cursor-pointer"
                >
                  <span>View All 16+ Outfits</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={(prod) => setSelectedProduct(prod)}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onToggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            </section>

            {/* How It Works Teaser */}
            <HowItWorksSection onExploreShop={() => setActiveTab('shop')} />

            {/* Hygiene & Safety Deep Dive */}
            <HygieneSafetySection />

            {/* Social Proof & Customer Reviews Showcase */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Real Wedding & Event Stories</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-stone-900">
                  Loved by 4,000+ Patrons
                </h2>
                <p className="text-stone-500 text-xs">
                  Read authentic sizing and fit experiences from customers across India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.slice(0, 3).map((r) => (
                  <div 
                    key={r.id}
                    className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {r.photoUrl && (
                            <img src={r.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border" />
                          )}
                          <div>
                            <span className="font-bold text-stone-900 text-xs block">{r.customerName}</span>
                            <span className="text-[10px] text-stone-400">{r.customerCity} • {r.occasionWorn}</span>
                          </div>
                        </div>

                        <div className="flex text-amber-500">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 text-[10px] text-stone-600">
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Height: {r.height}</span>
                        <span className="bg-stone-100 px-2 py-0.5 rounded-sm">Body: {r.bodyType}</span>
                        <span className="bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-sm">
                          {r.fitFeedback}
                        </span>
                      </div>

                      <p className="text-stone-700 text-xs italic leading-relaxed">
                        "{r.comment}"
                      </p>
                    </div>

                    <div className="text-[10px] text-stone-400 font-medium pt-2 border-t border-stone-100">
                      ✓ Verified Style-Rent Rental
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Call To Action */}
            <section className="bg-gradient-to-r from-[#450A18] via-[#5C1324] to-[#450A18] text-[#FAF7F2] py-16 px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#E6CA85]/20 text-[#E6CA85] px-4 py-1.5 rounded-full text-xs font-bold border border-[#E6CA85]/30">
                  <Sparkles className="w-4 h-4 text-[#E6CA85]" />
                  <span>College Project Prototype Demonstration</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Ready to Dress Like Royalty for Your Next Celebration?
                </h2>

                <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
                  Choose your rental duration, customize your body measurements, add a backup size for ₹399, and enjoy free doorstep return pickup.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="px-8 py-4 bg-[#E6CA85] hover:bg-[#d8b868] text-[#450A18] font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    Start Renting Now
                  </button>
                  <button
                    onClick={() => handleNavigateTab('database')}
                    className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    <span>View Project Database & Schema</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: SHOP / BROWSE PAGE */}
        {activeTab === 'shop' && (
          <ShopView
            products={products}
            onSelectProduct={(prod: Product) => setSelectedProduct(prod)}
            wishlistIds={wishlistIds}
            onToggleWishlist={toggleWishlist}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialOccasion={selectedOccasionForShop}
          />
        )}

        {/* VIEW 3: HOW IT WORKS */}
        {activeTab === 'how-it-works' && (
          <div className="py-6">
            <HowItWorksSection onExploreShop={() => handleNavigateTab('shop')} />
          </div>
        )}

        {/* VIEW 4: HYGIENE & SAFETY */}
        {activeTab === 'hygiene' && (
          <div className="py-6">
            <HygieneSafetySection />
          </div>
        )}

        {/* VIEW 5: MY ORDERS TRACKER */}
        {activeTab === 'orders' && (
          <OrdersTrackerView
            orders={orders}
            onExploreShop={() => handleNavigateTab('shop')}
            returnRequests={returnRequests}
            onSubmitReturnRequest={handleCreateReturnRequest}
          />
        )}

        {/* VIEW 6: ADMIN DASHBOARD (PIN PROTECTED) */}
        {activeTab === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboardView
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              inventory={inventory}
              onUpdateInventoryStatus={handleUpdateInventoryStatus}
              returnRequests={returnRequests}
              onInspectReturnRequest={handleAdminInspectReturnRequest}
              onLockAccess={handleAdminLogout}
            />
          ) : (
            <StaffPinGate
              targetSection="admin"
              onAuthenticated={() => {
                setIsAdminAuthenticated(true);
                setActiveTab('admin');
                window.location.hash = 'admin';
              }}
              onCancel={() => {
                setActiveTab('home');
                window.location.hash = 'home';
              }}
            />
          )
        )}

        {/* VIEW 7: DATABASE & SQL RELATIONAL STUDIO (PIN PROTECTED) */}
        {activeTab === 'database' && (
          isAdminAuthenticated ? (
            <DatabaseView
              products={products}
              orders={orders}
              inventory={inventory}
              onLockAccess={handleAdminLogout}
            />
          ) : (
            <StaffPinGate
              targetSection="database"
              onAuthenticated={() => {
                setIsAdminAuthenticated(true);
                setActiveTab('database');
                window.location.hash = 'database';
              }}
              onCancel={() => {
                setActiveTab('home');
                window.location.hash = 'home';
              }}
            />
          )
        )}

      </div>

      {/* Universal Footer */}
      <Footer onNavClick={(tab) => handleNavigateTab(tab)} />

      {/* MODAL 1: PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onRentNow={handleRentNow}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={toggleWishlist}
          reviews={reviews}
          onOpenReviewModal={(p) => setReviewProduct(p)}
        />
      )}

      {/* MODAL 2: CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* MODAL 3: WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={toggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* MODAL 4: CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        defaultCity={selectedCity}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* MODAL 5: ORDER CONFIRMATION MODAL */}
      {confirmedOrder && (
        <OrderConfirmationModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          onViewOrders={() => {
            setConfirmedOrder(null);
            setActiveTab('orders');
          }}
        />
      )}

      {/* MODAL 6: WRITE REVIEW MODAL */}
      {reviewProduct && (
        <ReviewModal
          product={reviewProduct}
          onClose={() => setReviewProduct(null)}
          onSubmitReview={handleAddReview}
        />
      )}

      {/* MODAL 7: STAFF & ADMIN PIN GATE */}
      {showPinGate && (
        <StaffPinGate
          targetSection={targetProtectedSection}
          onAuthenticated={() => {
            setIsAdminAuthenticated(true);
            setShowPinGate(false);
            setActiveTab(targetProtectedSection);
            window.location.hash = targetProtectedSection;
          }}
          onCancel={() => {
            setShowPinGate(false);
          }}
        />
      )}

    </div>
  );
}
