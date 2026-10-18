import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Table, 
  Code2, 
  Download, 
  Copy, 
  Check, 
  Layers, 
  Search, 
  Key, 
  Link2, 
  Info, 
  BookOpen,
  Sparkles,
  Lock
} from 'lucide-react';
import { STYLE_RENT_DATABASE_TABLES, SQL_SCHEMA_DDL, DatabaseTableDefinition } from '../data/databaseSchema';
import { Product, Order, InventoryItem } from '../types';

interface DatabaseViewProps {
  products?: Product[];
  orders?: Order[];
  inventory?: InventoryItem[];
  onLockAccess?: () => void;
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({
  products = [],
  orders = [],
  inventory = [],
  onLockAccess,
}) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'er-diagram' | 'sql' | 'json' | 'architecture'>('tables');
  const [selectedTable, setSelectedTable] = useState<string>('ordered_products');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [copiedSQL, setCopiedSQL] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  // Construct dynamic tables reflecting live orders and product updates
  const dynamicTables: DatabaseTableDefinition[] = useMemo(() => {
    // 0. ORDERED_PRODUCTS TABLE: dedicated table where EVERY single product ordered/bought is inserted as a distinct new row!
    const orderedProductsRows = orders.flatMap((o) => {
      return o.items.map((item, idx) => {
        const bankDetails = o.payment.bankName 
          ? `NetBanking (${o.payment.bankName} - ${o.payment.bankIfsc || 'Auth'})` 
          : o.payment.upiProvider 
            ? `UPI (${o.payment.upiProvider})` 
            : o.payment.method;
            
        return {
          row_id: `${o.orderNumber}-${idx + 1}`,
          order_number: o.orderNumber,
          product_id: item.product.id,
          product_name: item.product.name,
          customer_name: o.customer.fullName,
          city: o.customer.city,
          size: item.selectedSize,
          duration: `${item.rentalDays} Days`,
          dates: `${item.startDate} to ${item.returnDate}`,
          rental_fee: item.rentalFee,
          deposit: item.securityDeposit,
          payment_method: bankDetails,
          order_status: o.orderStatus,
          timestamp: new Date(o.createdAt).toLocaleString('en-IN')
        };
      });
    });

    const orderedProductsTable: DatabaseTableDefinition = {
      tableName: 'ordered_products',
      description: 'Live audit log of all customer rental orders and purchases - Every ordered product is inserted as a new row in real-time!',
      columns: [
        { name: 'row_id', type: 'VARCHAR(30)', isPrimary: true, nullable: false, description: 'Unique Item Row ID' },
        { name: 'order_number', type: 'VARCHAR(20)', nullable: false, description: 'Parent Order Number' },
        { name: 'product_id', type: 'VARCHAR(36)', nullable: false, description: 'Outfit Catalog ID' },
        { name: 'product_name', type: 'VARCHAR(150)', nullable: false, description: 'Rented Outfit Title' },
        { name: 'customer_name', type: 'VARCHAR(100)', nullable: false, description: 'Patron Full Name' },
        { name: 'city', type: 'VARCHAR(50)', nullable: false, description: 'Delivery City' },
        { name: 'size', type: 'VARCHAR(10)', nullable: false, description: 'Size Rented' },
        { name: 'duration', type: 'VARCHAR(20)', nullable: false, description: 'Event Duration' },
        { name: 'dates', type: 'VARCHAR(50)', nullable: false, description: 'Rental Event Window' },
        { name: 'rental_fee', type: 'DECIMAL(10,2)', nullable: false, description: 'Rental Charge (₹)' },
        { name: 'deposit', type: 'DECIMAL(10,2)', nullable: false, description: 'Refundable Security Deposit (₹)' },
        { name: 'payment_method', type: 'VARCHAR(60)', nullable: false, description: 'Payment Mode & Bank Details' },
        { name: 'order_status', type: 'VARCHAR(30)', nullable: false, description: 'Fulfillment Status' },
        { name: 'timestamp', type: 'VARCHAR(50)', nullable: false, description: 'Order Timestamp' }
      ],
      sampleRows: orderedProductsRows
    };

    const baseTables = STYLE_RENT_DATABASE_TABLES.map((tableDef) => {
      // 1. PRODUCTS TABLE: dynamically populate order counts and timestamps
      if (tableDef.tableName === 'products' && products.length > 0) {
        const liveRows = products.map((p) => {
          // Count orders for this product
          const matchingOrders = orders.filter((o) => o.items.some((item) => item.product.id === p.id));
          const latestOrder = matchingOrders[0];
          const hasActiveBookings = p.existingBookings.length > 0;

          return {
            product_id: p.id,
            name: p.name,
            category: p.category,
            gender: p.gender,
            rental_price_3d: p.rentalPrice3Days,
            rental_price_7d: p.rentalPrice7Days,
            rental_price_10d: p.rentalPrice10Days,
            retail_price: p.retailPrice,
            security_deposit: p.securityDeposit,
            color: p.color,
            fabric: p.fabric,
            rating: p.rating,
            total_orders_count: p.totalOrdersCount || matchingOrders.length,
            last_ordered_at: p.lastOrderedAt || (latestOrder ? new Date(latestOrder.createdAt).toLocaleString('en-IN') : 'None yet'),
            latest_order_id: p.latestOrderId || (latestOrder ? latestOrder.orderNumber : 'N/A'),
            rental_availability_status: hasActiveBookings ? 'Buffer Active' : 'Available',
            created_at: '2026-08-01 09:00:00'
          };
        });
        return { ...tableDef, sampleRows: liveRows };
      }

      // 2. ORDERS TABLE: dynamically populate live orders
      if (tableDef.tableName === 'orders' && orders.length > 0) {
        const liveOrders = orders.map((o) => ({
          order_id: o.id,
          order_number: o.orderNumber,
          user_id: o.customer.email,
          rental_subtotal: o.pricing.rentalSubtotal,
          security_deposit_total: o.pricing.securityDepositTotal,
          backup_options_total: o.pricing.backupOptionsTotal,
          damage_protection_total: o.pricing.damageProtectionTotal,
          grand_total: o.pricing.grandTotal,
          payment_method: o.payment.bankName ? `NetBanking (${o.payment.bankName})` : o.payment.method,
          payment_status: o.payment.status,
          order_status: o.orderStatus,
          return_bag_tracking: o.returnBagTracking,
          created_at: new Date(o.createdAt).toLocaleString('en-IN')
        }));
        return { ...tableDef, sampleRows: liveOrders };
      }

      // 3. ORDER_ITEMS TABLE: dynamically populate line items from orders
      if (tableDef.tableName === 'order_items' && orders.length > 0) {
        const liveItems: Record<string, any>[] = [];
        orders.forEach((o) => {
          o.items.forEach((item) => {
            liveItems.push({
              item_id: item.cartItemId,
              order_id: o.orderNumber,
              product_id: item.product.id,
              selected_size: item.selectedSize,
              duration_type: item.rentalDuration,
              start_date: item.startDate,
              delivery_date: item.deliveryDate,
              return_date: item.returnDate,
              fitting_option: item.fittingOption,
              backup_size_selected: item.backupSize || 'None',
              has_damage_protection: item.damageProtection
            });
          });
        });
        return { ...tableDef, sampleRows: liveItems };
      }

      // 4. INVENTORY TABLE: dynamically populate inventory units with status
      if (tableDef.tableName === 'inventory' && inventory.length > 0) {
        const liveInventory = inventory.map((unit) => ({
          inventory_id: unit.id,
          product_id: unit.productId,
          size: unit.size,
          sku: unit.sku,
          status: unit.status,
          current_order_id: unit.currentOrderId || 'N/A',
          next_available_date: unit.nextAvailableDate || 'Available Now',
          warehouse_location: unit.location || 'Mumbai-Hub'
        }));
        return { ...tableDef, sampleRows: liveInventory };
      }

      return tableDef;
    });

    return [orderedProductsTable, ...baseTables];
  }, [products, orders, inventory]);

  const currentTable = dynamicTables.find((t) => t.tableName === selectedTable) || dynamicTables[0];

  const filteredRows = currentTable.sampleRows.filter((row) => 
    JSON.stringify(row).toLowerCase().includes(tableSearch.toLowerCase())
  );

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_DDL);
    setCopiedSQL(true);
    setTimeout(() => setCopiedSQL(false), 2000);
  };

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(STYLE_RENT_DATABASE_TABLES, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([SQL_SCHEMA_DDL], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style_rent_schema.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(STYLE_RENT_DATABASE_TABLES, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style_rent_database.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#450A18] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E6CA85]/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#E6CA85] text-xs font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Relational Database Management System (RDBMS) Design</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-white">
            Style-Rent Relational Database Studio
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl">
            Complete database architecture designed for college project presentations and viva examinations. Explore schemas, foreign keys, operational buffer tables, and export SQL DDL scripts.
          </p>
        </div>

        {/* Action Download & Security Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {onLockAccess && (
            <button
              onClick={onLockAccess}
              className="px-3.5 py-2 rounded-xl bg-rose-900/90 hover:bg-rose-800 text-rose-100 text-xs font-bold border border-rose-400/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105"
              title="Lock Database Access (Logout)"
            >
              <Lock className="w-3.5 h-3.5 text-rose-300" />
              <span>Lock Database Access (Logout)</span>
            </button>
          )}

          <button
            onClick={handleDownloadSQL}
            className="px-3.5 py-2 rounded-xl bg-[#E6CA85] text-[#450A18] text-xs font-bold shadow-md flex items-center gap-1.5 hover:bg-[#d8b868] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .SQL</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .JSON</span>
          </button>
        </div>
      </div>

      {/* Real-time Order Insert Notice */}
      <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-bold text-emerald-900">
            Real-Time Database Sync Active:
          </span>
          <span className="text-emerald-800">
            Every product ordered or rented is automatically updated as a distinct new row below in <strong>ordered_products</strong>, <strong>orders</strong>, and <strong>order_items</strong> tables.
          </span>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-300 text-emerald-900">
          <span>Total Logged Orders: <strong>{orders.length}</strong></span>
          <span>•</span>
          <span>Ordered Items: <strong>{orders.reduce((acc, o) => acc + o.items.length, 0)}</strong></span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 border-b border-[#DFCBB5] pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'tables', label: 'Interactive Table Explorer', icon: Table },
          { id: 'er-diagram', label: 'ER Schema & Foreign Keys', icon: Layers },
          { id: 'sql', label: 'SQL DDL Query Script', icon: Code2 },
          { id: 'json', label: 'JSON Dataset', icon: Database },
          { id: 'architecture', label: 'Academic Viva & Design Notes', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#6B1D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INTERACTIVE TABLE EXPLORER */}
      {activeTab === 'tables' && (
        <div className="space-y-4">
          
          {/* Table Selector Pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-stone-600 mr-2">Select Relational Table:</span>
            {dynamicTables.map((t) => (
              <button
                key={t.tableName}
                onClick={() => {
                  setSelectedTable(t.tableName);
                  setTableSearch('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTable === t.tableName
                    ? 'bg-[#6B1D2F] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {t.tableName === 'ordered_products' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
                <span>{t.tableName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${
                  selectedTable === t.tableName ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {t.sampleRows.length} {t.sampleRows.length === 1 ? 'row' : 'rows'}
                </span>
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4">
            
            {/* Table Meta & Search */}
            <div className="p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-mono text-base font-bold text-[#6B1D2F] flex items-center gap-2">
                  <Table className="w-4 h-4" />
                  <span>TABLE: {currentTable.tableName}</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{currentTable.description}</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter table rows..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            {/* Columns Schema View (Top Summary) */}
            <div className="px-5 py-2 bg-stone-50/70 border-b border-stone-200 text-xs">
              <span className="font-bold text-stone-700 block mb-1">Column Definitions:</span>
              <div className="flex flex-wrap gap-1.5">
                {currentTable.columns.map((c) => (
                  <span 
                    key={c.name}
                    className="inline-flex items-center gap-1 bg-white border border-stone-200 px-2 py-0.5 rounded-md font-mono text-[11px] text-stone-700"
                    title={c.description}
                  >
                    {c.isPrimary && <Key className="w-3 h-3 text-amber-600" />}
                    {c.isForeign && <Link2 className="w-3 h-3 text-blue-600" />}
                    <strong className="text-stone-900">{c.name}</strong>
                    <span className="text-stone-400">({c.type})</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Live Rows Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 font-semibold border-b border-stone-200">
                  <tr>
                    {currentTable.columns.map((c) => (
                      <th key={c.name} className="py-2.5 px-4 font-mono font-bold whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {c.isPrimary && <Key className="w-3 h-3 text-amber-600" />}
                          {c.isForeign && <Link2 className="w-3 h-3 text-blue-600" />}
                          <span>{c.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={currentTable.columns.length} className="py-6 text-center text-stone-400">
                        No rows matching filter.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-stone-50/80">
                        {currentTable.columns.map((c) => (
                          <td key={c.name} className="py-2.5 px-4 whitespace-nowrap max-w-xs truncate text-stone-700">
                            {typeof row[c.name] === 'boolean' 
                              ? (row[c.name] ? 'TRUE' : 'FALSE') 
                              : row[c.name] === null || row[c.name] === undefined 
                                ? 'NULL' 
                                : String(row[c.name])}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ER SCHEMA & FOREIGN KEYS */}
      {activeTab === 'er-diagram' && (
        <div className="space-y-6">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#DFCBB5] text-xs text-stone-700">
            <strong>Relational Entity Relationship (ER) Model:</strong> Style-Rent employs a 3rd Normal Form (3NF) relational model. 
            Notice how physical units are detached into <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">inventory_units</code> to track wear count and sterilization, while <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">operational_buffers</code> handles time-based availability without database deadlocks.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STYLE_RENT_DATABASE_TABLES.map((t) => (
              <div key={t.tableName} className="bg-white rounded-2xl border border-stone-200 p-4 space-y-3 shadow-xs hover:border-[#6B1D2F]/40 transition-all">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-mono font-bold text-sm text-[#6B1D2F]">{t.tableName}</span>
                  <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-mono">
                    {t.columns.length} cols
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  {t.columns.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-[11px] py-0.5">
                      <div className="flex items-center gap-1">
                        {c.isPrimary && <span title="Primary Key"><Key className="w-3 h-3 text-amber-600 shrink-0" /></span>}
                        {c.isForeign && <span title={`Foreign Key references ${c.references}`}><Link2 className="w-3 h-3 text-blue-600 shrink-0" /></span>}
                        <span className={`font-semibold ${c.isPrimary ? 'text-amber-900' : c.isForeign ? 'text-blue-900' : 'text-stone-800'}`}>
                          {c.name}
                        </span>
                      </div>
                      <span className="text-stone-400 text-[10px]">{c.type}</span>
                    </div>
                  ))}
                </div>

                {t.columns.some((c) => c.isForeign) && (
                  <div className="pt-2 border-t border-stone-100 text-[10px] text-blue-700 font-sans space-y-0.5">
                    <span className="font-semibold block">Foreign Relationships:</span>
                    {t.columns.filter((c) => c.isForeign).map((c) => (
                      <div key={c.name} className="flex items-center gap-1 font-mono">
                        <span>↳ {c.name} ➔ {c.references}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SQL DDL SCRIPT */}
      {activeTab === 'sql' && (
        <div className="bg-[#1F1D1D] rounded-3xl p-6 text-stone-200 space-y-4 shadow-xl border border-stone-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#E6CA85]" />
              <span className="font-mono text-sm font-bold text-white">style_rent_schema.sql</span>
              <span className="text-xs text-stone-400 font-mono">(PostgreSQL / MySQL DDL)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySQL}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1 border border-stone-700 cursor-pointer"
              >
                {copiedSQL ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSQL ? 'Copied' : 'Copy SQL'}</span>
              </button>

              <button
                onClick={handleDownloadSQL}
                className="px-3 py-1.5 rounded-lg bg-[#E6CA85] hover:bg-[#d8b868] text-xs font-bold text-[#450A18] flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save SQL File</span>
              </button>
            </div>
          </div>

          <pre className="font-mono text-xs text-stone-300 bg-black/60 p-5 rounded-2xl overflow-x-auto max-h-[500px] leading-relaxed">
            {SQL_SCHEMA_DDL}
          </pre>
        </div>
      )}

      {/* TAB 4: JSON DATASET */}
      {activeTab === 'json' && (
        <div className="bg-[#1F1D1D] rounded-3xl p-6 text-stone-200 space-y-4 shadow-xl border border-stone-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#E6CA85]" />
              <span className="font-mono text-sm font-bold text-white">db.json (Relational Seed Store)</span>
            </div>

            <button
              onClick={handleCopyJSON}
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1 border border-stone-700 cursor-pointer"
            >
              {copiedJSON ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJSON ? 'Copied JSON' : 'Copy JSON'}</span>
            </button>
          </div>

          <pre className="font-mono text-xs text-emerald-400 bg-black/60 p-5 rounded-2xl overflow-x-auto max-h-[500px] leading-relaxed">
            {JSON.stringify(STYLE_RENT_DATABASE_TABLES, null, 2)}
          </pre>
        </div>
      )}

      {/* TAB 5: ACADEMIC VIVA & DESIGN NOTES */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 text-stone-800 text-xs leading-relaxed">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Style-Rent: Database Engineering & Technical Architecture Report
            </h3>
            <p className="text-stone-500">Prepared for College Project Evaluators & Technical Viva</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">1. The "Operational Buffer" Innovation</h4>
              <p className="text-stone-600">
                In traditional e-commerce, an item is simply sold and removed from stock. In a clothing rental startup, an outfit returns and must undergo <strong>inspection, hydro-dry cleaning, UV-C sanitization, and packaging</strong> before the next user can wear it. 
                Our <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">operational_buffers</code> table models this 2-3 day pre- and post-event lockout period mathematically to completely eliminate double-booking bugs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">2. Database Normalization (3NF)</h4>
              <p className="text-stone-600">
                Products (catalog templates) are separated from <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">inventory_units</code> (physical barcoded garment assets). 
                This ensures that if one specific Sherwani in Size L is at the dry cleaner, another Sherwani in Size XL remains bookable without duplicating product descriptions or media assets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">3. Security Deposit & Damage Ledger</h4>
              <p className="text-stone-600">
                Every rental agreement includes a refundable collateral deposit stored in <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">orders.security_deposit_total</code>. 
                When the package returns, warehouse staff complete a <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">damage_inspections</code> record. The system calculates net refund = (Deposit - DamageFee) and dispatches automated UPI reversals.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DFCBB5] space-y-2">
              <h4 className="font-bold text-sm text-[#6B1D2F]">4. Privacy & KYC Mock Implementation</h4>
              <p className="text-stone-600">
                For high-value designer apparel, users undergo mock Aadhaar / PAN confirmation. To comply with privacy best practices, ID numbers are stored with standard masking (<code className="bg-stone-200 px-1 py-0.5 rounded font-mono">XXXX-XXXX-4819</code>) rather than plaintext raw documents.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
