"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AutocompleteInput from "@/components/AutocompleteInput";
import { VEHICLE_MAKES, VEHICLE_MODELS } from "@/lib/vehicleData";
import {
  Car,
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  MapPin,
  ChevronDown,
  Bell,
  User,
  LogOut,
  Home,
  Wallet,
  Bookmark,
  History,
  HelpCircle,
  Menu,
  X,
  Check,
  ChevronRight,
  Upload,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Mail,
  Shield,
  ShieldOff,
  UserX,
  MessageSquare,
  Clock,
  FileText,
  Plus,
  Star as StarIcon,
  ArrowUpDown,
  Download,
  FileUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

// ─── Reusable UI Components ────────────────────────────────────────────────────

const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const base = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`} {...props}>{children}</div>
);
const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>{children}</div>
);
const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>
);
const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>{children}</p>
);
const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>{children}</div>
);
const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>{children}</div>
);

const Badge = ({ className = "", variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    destructive: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Input = ({ className = "", type = "text", ...props }) => (
  <input type={type} className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
);

const Separator = ({ className = "", orientation = "horizontal" }) => (
  <div className={`${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} bg-gray-200 ${className}`} />
);




// ─── Sidebar ────────────────────────────────────────────────────────────────────

const SidebarContext = React.createContext({ collapsed: false, setCollapsed: () => {} });

const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      <div className="flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  );
};

const SidebarInset = ({ className = "", children }) => {
  const { collapsed } = React.useContext(SidebarContext);
  return <main className={`flex-1 transition-all duration-300 ml-0 ${collapsed ? "lg:ml-16" : "lg:ml-64"} ${className}`}>{children}</main>;
};

const SidebarTrigger = ({ className = "" }) => {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = React.useContext(SidebarContext);
  return (
    <Button variant="ghost" size="icon" className={className} onClick={() => {
      if (window.innerWidth < 1024) {
        setMobileOpen(!mobileOpen);
      } else {
        setCollapsed(!collapsed);
      }
    }}>
      <Menu className="h-4 w-4" />
    </Button>
  );
};

const AppSidebar = ({ activeTab, onTabChange }) => {
  const { collapsed, mobileOpen, setMobileOpen } = React.useContext(SidebarContext);
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "listings", label: "Listings", icon: Car },
    { key: "forms", label: "Forms", icon: FileText },
    { key: "users", label: "Users", icon: Users },
    { key: "contacts", label: "Contacts", icon: Mail },
    { key: "reviews", label: "Reviews", icon: StarIcon },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-blue-500 px-4">
        {collapsed && !mobileOpen ? <Car className="h-8 w-8 mx-auto" /> : <span className="text-xl font-bold">Autobon</span>}
        {mobileOpen && (
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 rounded hover:bg-blue-700">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.key}>
                <button
                  onClick={() => { onTabChange(item.key); if (mobileOpen) setMobileOpen(false); }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-white transition-colors ${activeTab === item.key ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"}`}
                >
                  <Icon className="h-5 w-5" />
                  {(!collapsed || mobileOpen) && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-0 h-full bg-blue-600 text-white transition-all duration-300 z-20 ${collapsed ? "w-16" : "w-64"}`}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed left-0 top-0 h-full w-64 bg-blue-600 text-white z-40 animate-[slideInLeft_0.2s_ease-out]">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
};

// ─── Add / Edit Car Modal ──────────────────────────────────────────────────────

function CarFormModal({ isOpen, onClose, onSaved, editCar }) {
  const [form, setForm] = React.useState({
    title: "", year: new Date().getFullYear(), make: "", model: "", trim: "",
    price: "", mileage: "", fuelType: "Gasoline", transmission: "Automatic",
    bodyType: "Sedan", color: "", condition: "Used", location: "",
    description: "", badge: "", priceRating: "", biWeekly: "", downPayment: "$0 down",
    isVisible: true, noAccident: true,
  });
  const [imageFiles, setImageFiles] = React.useState([]);
  const [existingImages, setExistingImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (editCar) {
      setForm({
        title: editCar.title || "",
        year: editCar.year || new Date().getFullYear(),
        make: editCar.make || "",
        model: editCar.model || "",
        trim: editCar.trim || "",
        price: editCar.price || "",
        mileage: editCar.mileage || "",
        fuelType: editCar.fuelType || "Gasoline",
        transmission: editCar.transmission || "Automatic",
        bodyType: editCar.bodyType || "Sedan",
        color: editCar.color || "",
        condition: editCar.condition || "Used",
        location: editCar.location || "",
        description: editCar.description || "",
        badge: editCar.badge || "",
        priceRating: editCar.priceRating || "",
        biWeekly: editCar.biWeekly || "",
        downPayment: editCar.downPayment || "$0 down",
        isVisible: editCar.isVisible !== false,
        noAccident: editCar.noAccident !== false,
      });
      setExistingImages(editCar.images || []);
    } else {
      setForm({
        title: "", year: new Date().getFullYear(), make: "", model: "", trim: "",
        price: "", mileage: "", fuelType: "Gasoline", transmission: "Automatic",
        bodyType: "Sedan", color: "", condition: "Used", location: "",
        description: "", badge: "", priceRating: "", biWeekly: "", downPayment: "$0 down",
        isVisible: true, noAccident: true,
      });
      setExistingImages([]);
    }
    setImageFiles([]);
    setError("");
  }, [editCar, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleMakeChange = (val) => {
    setForm((p) => ({ ...p, make: val, model: "" }));
  };

  const handleModelChange = (val) => {
    setForm((p) => ({ ...p, model: val }));
  };

  const adminModelSuggestions = VEHICLE_MODELS[form.make] || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Upload new images to Firebase Storage (auto-convert to WebP)
      let imageUrls = existingImages.map((img) => img.url);
      if (imageFiles.length > 0) {
        const { storage } = await import("@/lib/firebase");
        const { ref, uploadString, getDownloadURL } = await import("firebase/storage");
        if (!storage) throw new Error("Firebase Storage not initialized");

        // Convert image file to WebP using Canvas API
        const convertToWebP = (file) => new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            // Resize: max 1600px wide, maintain aspect ratio
            const MAX_W = 1600;
            let w = img.width, h = img.height;
            if (w > MAX_W) { h = Math.round(h * (MAX_W / w)); w = MAX_W; }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            // 0.85 quality WebP
            const dataUrl = canvas.toDataURL("image/webp", 0.85);
            resolve(dataUrl);
          };
          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        });

        const uploadPromises = imageFiles.map(async (file) => {
          const webpData = await convertToWebP(file);
          const fileName = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
          const storageRef = ref(storage, fileName);
          await uploadString(storageRef, webpData, "data_url", { contentType: "image/webp" });
          return getDownloadURL(storageRef);
        });
        const newUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newUrls];
      }

      // Auto-generate title if empty
      const title = form.title || `${form.year} ${form.make} ${form.model}`.trim();

      const body = { ...form, title, price: parseFloat(form.price), year: parseInt(form.year), imageUrls };

      const url = editCar ? `/api/cars/${editCar.id}` : "/api/cars";
      const method = editCar ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save car");
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl mx-4">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold text-gray-900">
            {editCar ? "Edit Listing" : "Add New Listing"}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 sm:p-5 space-y-4 sm:space-y-5">
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
              <input name="year" type="number" value={form.year} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make *</label>
              <AutocompleteInput
                name="make"
                value={form.make}
                onChange={handleMakeChange}
                suggestions={VEHICLE_MAKES}
                placeholder="e.g. Toyota"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
              <AutocompleteInput
                name="model"
                value={form.model}
                onChange={handleModelChange}
                suggestions={adminModelSuggestions}
                placeholder="e.g. Camry"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!form.make}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trim</label>
              <input name="trim" value={form.trim} onChange={handleChange} placeholder="e.g. XLE" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
              <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required placeholder="45000" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
              <input name="mileage" value={form.mileage} onChange={handleChange} placeholder="e.g. 15,000 km" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <select name="fuelType" value={form.fuelType} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
              <select name="transmission" value={form.transmission} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {["Automatic", "Manual", "CVT"].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Type</label>
              <select name="bodyType" value={form.bodyType} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {["Sedan", "SUV", "Coupe", "Hatchback", "Truck", "Van", "Convertible", "Wagon"].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select name="condition" value={form.condition} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {["New", "Used"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Toronto, ON" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
              <select name="badge" value={form.badge} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">None</option>
                {["Featured", "Premium", "Best Seller", "Hot Deal", "New Arrival"].map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bi-Weekly Payment</label>
              <input name="biWeekly" value={form.biWeekly} onChange={handleChange} placeholder="e.g. $499" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
              <input name="downPayment" value={form.downPayment} onChange={handleChange} placeholder="e.g. $0 down" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Rating</label>
              <select name="priceRating" value={form.priceRating} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">None</option>
                {["Fair Price", "Good Price", "Great Price", "Market Price"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe the vehicle..." className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-700">Visible on shop</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="noAccident" checked={form.noAccident} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-700">No accident</span>
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {existingImages.map((img, i) => (
                  <div key={img.id || i} className="relative group">
                    <img src={img.url} alt="" className="h-20 w-20 rounded-lg object-cover border" />
                    <button type="button" onClick={() => setExistingImages((p) => p.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-1">
              <label className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                <Upload className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Click to upload images (JPEG, PNG, WebP)</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => setImageFiles(Array.from(e.target.files))} />
              </label>
              {imageFiles.length > 0 && (
                <p className="mt-1 text-xs text-green-600">{imageFiles.length} file(s) selected</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : editCar ? "Update Listing" : "Create Listing"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── CSV Upload Modal ───────────────────────────────────────────────────────────

const CSV_COLUMNS = [
  "title", "year", "make", "model", "trim", "price", "mileage",
  "fuelType", "transmission", "bodyType", "color", "condition",
  "location", "description", "badge", "priceRating", "biWeekly",
  "downPayment", "noAccident", "isVisible", "features",
];

function CsvUploadModal({ isOpen, onClose, onImported }) {
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState("");
  const [dragOver, setDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      setFile(null);
      setPreview([]);
      setResult(null);
      setError("");
      setDragOver(false);
    }
  }, [isOpen]);

  const parseCSVPreview = (text) => {
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    return lines.slice(1, 6).map((line) => {
      const values = line.match(/("[^"]*"|[^,]*)/g) || [];
      const row = {};
      headers.forEach((h, i) => {
        row[h] = (values[i] || "").trim().replace(/^"|"$/g, "");
      });
      return row;
    });
  };

  const handleFileSelect = (f) => {
    if (!f) return;
    if (!f.name.endsWith(".csv")) {
      setError("Please select a CSV file");
      return;
    }
    setError("");
    setResult(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rows = parseCSVPreview(e.target.result);
        setPreview(rows);
      } catch {
        setPreview([]);
      }
    };
    reader.readAsText(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    handleFileSelect(f);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("csvFile", file);
      const res = await fetch("/api/admin/csv-import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Import failed");
      setResult(data);
      if (data.imported > 0) onImported();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleRows = [
      CSV_COLUMNS.join(","),
      '"2024 Toyota Camry XLE",2024,Toyota,Camry,XLE,35999,"15,000 km",Gasoline,Automatic,Sedan,White,Used,"Toronto, ON","Well maintained vehicle",Featured,Great Price,$299,$0 down,true,true,"Sunroof|AWD|Heated Seats"',
      ',2023,Honda,Civic,,28500,"22,000 km",Gasoline,CVT,Sedan,Black,Used,"Vancouver, BC",,,,,,true,false,',
    ];
    const blob = new Blob([sampleRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "autobon_cars_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const previewHeaders = preview.length > 0 ? Object.keys(preview[0]) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl mx-4">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Import Cars from CSV</h2>
            <p className="text-sm text-gray-500 mt-0.5">Bulk upload car listings from a CSV file</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Download Template */}
          <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-semibold text-gray-800">Need a template?</p>
                <p className="text-xs text-gray-500">Download a sample CSV with all column headers</p>
              </div>
            </div>
            <button
              onClick={downloadSampleCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-blue-300 text-blue-700 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>

          {/* Drop Zone */}
          {!result && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                dragOver
                  ? "border-blue-500 bg-blue-50"
                  : file
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div className="text-left">
                    <p className="font-semibold text-green-800">{file.name}</p>
                    <p className="text-xs text-green-600">{(file.size / 1024).toFixed(1)} KB — Click or drag to replace</p>
                  </div>
                </div>
              ) : (
                <>
                  <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="font-semibold text-gray-700">Drop your CSV file here</p>
                  <p className="text-sm text-gray-400 mt-1">or click to browse</p>
                </>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4 border border-red-200">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Import Error</p>
                <p className="text-sm text-red-600 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Preview Table */}
          {preview.length > 0 && !result && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Preview (first {preview.length} rows)</p>
              <div className="border rounded-lg overflow-x-auto max-h-[200px]">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      {previewHeaders.map((h) => (
                        <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap border-b">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {preview.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        {previewHeaders.map((h) => (
                          <td key={h} className="px-3 py-2 whitespace-nowrap text-gray-700 max-w-[180px] truncate">{row[h] || "—"}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-green-50 rounded-lg p-4 border border-green-200">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-base font-bold text-green-800">Import Complete!</p>
                  <p className="text-sm text-green-700 mt-1">{result.message}</p>
                  <div className="flex gap-4 mt-3">
                    <div className="bg-white rounded-md px-3 py-2 border border-green-200">
                      <p className="text-lg font-bold text-green-700">{result.imported}</p>
                      <p className="text-xs text-gray-500">Imported</p>
                    </div>
                    <div className="bg-white rounded-md px-3 py-2 border border-green-200">
                      <p className="text-lg font-bold text-amber-600">{result.skipped}</p>
                      <p className="text-xs text-gray-500">Skipped</p>
                    </div>
                    <div className="bg-white rounded-md px-3 py-2 border border-green-200">
                      <p className="text-lg font-bold text-gray-700">{result.total}</p>
                      <p className="text-xs text-gray-500">Total Rows</p>
                    </div>
                  </div>
                </div>
              </div>

              {result.errors?.length > 0 && (
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-sm font-semibold text-amber-800 mb-2">⚠️ Skipped Rows</p>
                  <div className="max-h-[150px] overflow-y-auto space-y-1">
                    {result.errors.map((err, i) => (
                      <p key={i} className="text-xs text-amber-700">
                        <strong>Row {err.row}:</strong> {err.reason}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400">
                💡 Imported cars are set to <strong>Hidden</strong> by default. Go to Listings to add images and make them visible.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {result ? "Close" : "Cancel"}
            </Button>
            {!result && (
              <Button
                type="button"
                disabled={!file || uploading}
                onClick={handleUpload}
                className="flex-1 gap-2"
              >
                {uploading ? (
                  <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Importing...</>
                ) : (
                  <><Upload className="h-4 w-4" /> Import Cars</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ─────────────────────────────────────────────────

function DeleteModal({ isOpen, onClose, onConfirm, carTitle, loading }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl mx-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Listing</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete <strong>&quot;{carTitle}&quot;</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading} className="flex-1">
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [cars, setCars] = React.useState([]);
  const [stats, setStats] = React.useState(null);
  const [loadingCars, setLoadingCars] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Modal states
  const [showCarForm, setShowCarForm] = React.useState(false);
  const [editingCar, setEditingCar] = React.useState(null);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [showCsvUpload, setShowCsvUpload] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [selectedCars, setSelectedCars] = React.useState([]);
  const [bulkDeleting, setBulkDeleting] = React.useState(false);

  // Auth guard
  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch cars
  const fetchCars = React.useCallback(async () => {
    try {
      setLoadingCars(true);
      const res = await fetch("/api/cars/all");
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoadingCars(false);
    }
  }, []);

  // Fetch stats
  const fetchStats = React.useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  }, []);

  // Users state
  const [adminUsers, setAdminUsers] = React.useState([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);

  // Contacts state
  const [contacts, setContacts] = React.useState([]);
  const [loadingContacts, setLoadingContacts] = React.useState(false);
  const [expandedContact, setExpandedContact] = React.useState(null);

  const fetchUsers = React.useCallback(async () => {
    try {
      setLoadingUsers(true);
      const res = await fetch("/api/admin/users");
      if (res.ok) setAdminUsers(await res.json());
    } catch (err) { console.error("Failed to fetch users:", err); }
    finally { setLoadingUsers(false); }
  }, []);

  const fetchContacts = React.useCallback(async () => {
    try {
      setLoadingContacts(true);
      const res = await fetch("/api/admin/contacts");
      if (res.ok) setContacts(await res.json());
    } catch (err) { console.error("Failed to fetch contacts:", err); }
    finally { setLoadingContacts(false); }
  }, []);

  const toggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) fetchUsers();
      else { const d = await res.json(); alert(d.message); }
    } catch (err) { console.error("Role change failed:", err); }
  };

  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (res.ok) { fetchUsers(); fetchStats(); }
      else { const d = await res.json(); alert(d.message); }
    } catch (err) { console.error("Delete user failed:", err); }
  };

  const deleteContact = async (contactId) => {
    try {
      const res = await fetch(`/api/admin/contacts/${contactId}`, { method: "DELETE" });
      if (res.ok) { fetchContacts(); fetchStats(); }
    } catch (err) { console.error("Delete contact failed:", err); }
  };

  // Forms state
  const [forms, setForms] = React.useState([]);
  const [loadingForms, setLoadingForms] = React.useState(false);
  const [formFilter, setFormFilter] = React.useState("all");
  const [expandedForm, setExpandedForm] = React.useState(null);

  const fetchForms = React.useCallback(async () => {
    try {
      setLoadingForms(true);
      const res = await fetch("/api/admin/forms");
      if (res.ok) setForms(await res.json());
    } catch (err) { console.error("Failed to fetch forms:", err); }
    finally { setLoadingForms(false); }
  }, []);

  const updateFormStatus = async (formId, status) => {
    try {
      const res = await fetch(`/api/admin/forms/${formId}/status`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) fetchForms();
    } catch (err) { console.error("Update form status failed:", err); }
  };

  const deleteForm = async (formId) => {
    if (!confirm("Delete this form submission?")) return;
    try {
      const res = await fetch(`/api/admin/forms/${formId}`, { method: "DELETE" });
      if (res.ok) { fetchForms(); fetchStats(); }
    } catch (err) { console.error("Delete form failed:", err); }
  };

  // Reviews state
  const [adminReviews, setAdminReviews] = React.useState([]);
  const [loadingReviews, setLoadingReviews] = React.useState(false);
  const [reviewModal, setReviewModal] = React.useState(false);
  const [editingReview, setEditingReview] = React.useState(null);
  const [reviewForm, setReviewForm] = React.useState({ name: "", role: "Satisfied Customer", text: "", rating: 5, imageUrl: "", isVisible: true });

  const fetchReviews = React.useCallback(async () => {
    try {
      setLoadingReviews(true);
      const res = await fetch("/api/reviews/all");
      if (res.ok) setAdminReviews(await res.json());
    } catch (err) { console.error("Failed to fetch reviews:", err); }
    finally { setLoadingReviews(false); }
  }, []);

  const openReviewModal = (review = null) => {
    if (review) {
      setEditingReview(review);
      setReviewForm({ name: review.name, role: review.role, text: review.text, rating: review.rating, imageUrl: review.imageUrl || "", isVisible: review.isVisible });
    } else {
      setEditingReview(null);
      setReviewForm({ name: "", role: "Satisfied Customer", text: "", rating: 5, imageUrl: "", isVisible: true });
    }
    setReviewModal(true);
  };

  const saveReview = async () => {
    try {
      const url = editingReview ? `/api/reviews/${editingReview.id}` : "/api/reviews";
      const method = editingReview ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });
      if (res.ok) { fetchReviews(); fetchStats(); setReviewModal(false); }
    } catch (err) { console.error("Save review failed:", err); }
  };

  const toggleReviewVisibility = async (review) => {
    try {
      await fetch(`/api/reviews/${review.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: !review.isVisible }),
      });
      fetchReviews();
    } catch (err) { console.error("Toggle review visibility failed:", err); }
  };

  const deleteReview = async (reviewId) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews/${reviewId}`, { method: "DELETE" });
      if (res.ok) { fetchReviews(); fetchStats(); }
    } catch (err) { console.error("Delete review failed:", err); }
  };

  const moveReview = async (index, direction) => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= adminReviews.length) return;
    const newOrder = [...adminReviews];
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    try {
      await fetch("/api/reviews/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder.map((r, i) => ({ id: r.id, position: i })) }),
      });
      fetchReviews();
    } catch (err) { console.error("Reorder failed:", err); }
  };

  React.useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchCars();
      fetchStats();
      fetchUsers();
      fetchContacts();
      fetchForms();
      fetchReviews();
    }
  }, [user, fetchCars, fetchStats, fetchUsers, fetchContacts, fetchForms, fetchReviews]);

  // Delete car
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/cars/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCars();
        fetchStats();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  };

  // Toggle visibility
  const toggleVisibility = async (car) => {
    try {
      await fetch(`/api/cars/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVisible: !car.isVisible }),
      });
      fetchCars();
    } catch (err) {
      console.error("Toggle visibility failed:", err);
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    if (selectedCars.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedCars.length} car(s)? This cannot be undone.`)) return;
    setBulkDeleting(true);
    try {
      const res = await fetch("/api/cars/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedCars }),
      });
      if (res.ok) {
        setSelectedCars([]);
        fetchCars();
        fetchStats();
      }
    } catch (err) {
      console.error("Bulk delete failed:", err);
    } finally {
      setBulkDeleting(false);
    }
  };

  const toggleSelectCar = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const selectAllCars = () => {
    if (selectedCars.length === filteredCars.length) {
      setSelectedCars([]);
    } else {
      setSelectedCars(filteredCars.map((c) => c.id));
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Filter cars by search
  const filteredCars = cars.filter((car) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return car.title.toLowerCase().includes(q) || car.make.toLowerCase().includes(q) || car.model.toLowerCase().includes(q);
  });

  if (authLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const statsData = [
    { title: "Total Listings", value: stats?.totalListings ?? "...", change: `${stats?.recentListings ?? 0} new this month`, icon: Car, trend: "up" },
    { title: "Active Users", value: stats?.activeUsers ?? "...", change: "Registered users", icon: Users, trend: "up" },
    { title: "Avg. Price", value: stats?.avgPrice ? `$${stats.avgPrice.toLocaleString()}` : "...", change: "Across all listings", icon: TrendingUp, trend: "up" },
    { title: "Visible Listings", value: stats?.visibleListings ?? "...", change: "Shown on shop", icon: Bookmark, trend: "up" },
  ];

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-3 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4 hidden sm:block" />
            <nav aria-label="breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
                <li className="hidden md:block">
                  <span className="hover:text-gray-900 transition-colors">Admin Dashboard</span>
                </li>
                <li className="hidden md:block"><ChevronRight className="h-3.5 w-3.5" /></li>
                <li><span className="font-medium text-gray-900 capitalize">{activeTab}</span></li>
              </ol>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search cars..." className="w-[200px] lg:w-[300px] pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 px-1 sm:px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-medium">
                {user.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4 sm:mr-1" /><span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 space-y-4 sm:space-y-6 bg-gray-50 p-3 sm:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
                    Welcome back, {user.name}! 👋
                  </h1>
                  <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with your car inventory today.</p>
                </div>
                <Button className="gap-2 self-start" onClick={() => { setEditingCar(null); setShowCarForm(true); }}>
                  <Plus className="h-4 w-4" /> Add New Listing
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                        <Icon className="h-4 w-4 text-gray-400" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Listings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900">Recent Listings</CardTitle>
                  <CardDescription>Latest cars added to your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingCars ? (
                    <div className="flex justify-center py-8">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {cars.slice(0, 4).map((car) => (
                        <Card key={car.id} className="overflow-hidden group">
                          <div className="relative">
                            <img
                              src={car.images?.[0]?.url || "https://via.placeholder.com/400x200?text=No+Image"}
                              alt={car.title}
                              className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                            />
                            {car.badge && <Badge className="absolute left-3 top-3">{car.badge}</Badge>}
                            {!car.isVisible && <Badge variant="warning" className="absolute right-3 top-3">Hidden</Badge>}
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 truncate">{car.title}</h4>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />{car.location || "N/A"}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-lg font-bold text-gray-900">${car.price?.toLocaleString()}</span>
                              <div className="flex gap-1">
                                <button onClick={() => { setEditingCar(car); setShowCarForm(true); }} className="p-1.5 rounded-md hover:bg-gray-100">
                                  <Edit className="h-3.5 w-3.5 text-gray-500" />
                                </button>
                                <button onClick={() => setDeleteTarget(car)} className="p-1.5 rounded-md hover:bg-red-50">
                                  <Trash2 className="h-3.5 w-3.5 text-red-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full justify-start gap-2" variant="ghost" onClick={() => { setEditingCar(null); setShowCarForm(true); }}>
                      <Plus className="h-4 w-4" /> Add New Listing
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="ghost" onClick={() => setActiveTab("listings")}>
                      <Car className="h-4 w-4" /> Manage Listings
                    </Button>
                    <Button className="w-full justify-start gap-2" variant="ghost" onClick={() => setActiveTab("users")}>
                      <Users className="h-4 w-4" /> View Users
                    </Button>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Recent Activity</CardTitle>
                    <CardDescription>Latest changes to your inventory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats?.recentActivity?.map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="h-2 w-2 rounded-full bg-blue-600" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">{item.title}</span> — ${item.price?.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                      {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                        <p className="text-sm text-gray-400">No recent activity</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Listings Tab */}
          {activeTab === "listings" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Car Listings</h1>
                  <p className="text-gray-500 text-sm">{cars.length} total listings</p>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <Button variant="outline" className="gap-2 text-xs sm:text-sm" onClick={() => setShowCsvUpload(true)}>
                    <Upload className="h-4 w-4" /> <span className="hidden sm:inline">Import</span> CSV
                  </Button>
                  <Button className="gap-2 text-xs sm:text-sm" onClick={() => { setEditingCar(null); setShowCarForm(true); }}>
                    <Plus className="h-4 w-4" /> <span className="hidden sm:inline">Add New</span><span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </div>

              {/* Mobile search */}
              <div className="md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search cars..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>

              {/* Bulk action bar */}
              {selectedCars.length > 0 && (
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-3 sm:px-4 py-3">
                  <Check className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-semibold text-blue-800">{selectedCars.length} selected</span>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedCars([])}>
                      <span className="hidden sm:inline">Deselect All</span><span className="sm:hidden">Clear</span>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={handleBulkDelete} disabled={bulkDeleting}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      {bulkDeleting ? "..." : `Delete (${selectedCars.length})`}
                    </Button>
                  </div>
                </div>
              )}

              {loadingCars ? (
                <div className="flex justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : filteredCars.length === 0 ? (
                <Card className="p-8 sm:p-12 text-center">
                  <Car className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchQuery ? "Try a different search term" : "Add your first car listing to get started"}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => { setEditingCar(null); setShowCarForm(true); }}>
                      <Plus className="h-4 w-4 mr-2" /> Add First Listing
                    </Button>
                  )}
                </Card>
              ) : (
                <>
                  {/* Select all */}
                  <div className="flex items-center gap-3 px-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedCars.length === filteredCars.length && filteredCars.length > 0}
                        onChange={selectAllCars}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      Select All ({filteredCars.length})
                    </label>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                    {filteredCars.map((car) => (
                      <Card key={car.id} className={`flex flex-col sm:flex-row overflow-hidden transition-all ${selectedCars.includes(car.id) ? "ring-2 ring-blue-400 bg-blue-50/30" : ""}`}>
                        <div className="relative sm:w-44 md:w-56 shrink-0">
                          {/* Checkbox overlay */}
                          <label className="absolute left-2 top-2 z-10 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCars.includes(car.id)}
                              onChange={() => toggleSelectCar(car.id)}
                              className="h-5 w-5 rounded border-2 border-white shadow text-blue-600 cursor-pointer"
                            />
                          </label>
                          <img
                            src={car.images?.[0]?.url || "https://via.placeholder.com/400x200?text=No+Image"}
                            alt={car.title}
                            className="h-40 sm:h-full w-full object-cover"
                          />
                          {car.badge && <Badge className="absolute right-2 top-2">{car.badge}</Badge>}
                        </div>
                        <div className="flex-1 p-3 sm:p-5">
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <div className="min-w-0">
                              <h3 className="text-sm sm:text-lg font-bold text-gray-900 truncate">{car.title}</h3>
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-xs sm:text-sm text-gray-500">
                                {car.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{car.location}</span>}
                                {car.mileage && <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{car.mileage}</span>}
                                <span className="hidden sm:flex items-center gap-1">{car.fuelType && <><Fuel className="h-3 w-3" />{car.fuelType}</>}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-base sm:text-xl font-bold text-gray-900">${car.price?.toLocaleString()}</p>
                              {car.biWeekly && <p className="text-xs text-gray-500">{car.biWeekly}/bi-weekly</p>}
                            </div>
                          </div>
                          {car.description && (
                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-3">{car.description}</p>
                          )}
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <Badge variant={car.isVisible ? "success" : "warning"}>
                              {car.isVisible ? "Visible" : "Hidden"}
                            </Badge>
                            {car.condition && <Badge variant="secondary" className="hidden sm:inline-flex">{car.condition}</Badge>}
                            {car.bodyType && <Badge variant="outline" className="hidden sm:inline-flex">{car.bodyType}</Badge>}
                            <div className="ml-auto flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => toggleVisibility(car)} title={car.isVisible ? "Hide" : "Show"}>
                                {car.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => { setEditingCar(car); setShowCarForm(true); }}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => setDeleteTarget(car)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Users</h1>
                  <p className="text-gray-500 text-sm">{adminUsers.length} registered users</p>
                </div>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left font-medium text-gray-500 pb-3 pr-4">User</th>
                            <th className="text-left font-medium text-gray-500 pb-3 pr-4 hidden md:table-cell">Email</th>
                            <th className="text-left font-medium text-gray-500 pb-3 pr-4">Role</th>
                            <th className="text-left font-medium text-gray-500 pb-3 pr-4 hidden lg:table-cell">Joined</th>
                            <th className="text-right font-medium text-gray-500 pb-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminUsers.map((u) => (
                            <tr key={u.id} className="border-b border-gray-100 last:border-0">
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                                    {u.name?.[0]?.toUpperCase() || "U"}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900">{u.name}</p>
                                    <p className="text-xs text-gray-400 md:hidden">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 pr-4 text-gray-600 hidden md:table-cell">{u.email}</td>
                              <td className="py-3 pr-4">
                                <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>{u.role}</Badge>
                              </td>
                              <td className="py-3 pr-4 text-gray-500 hidden lg:table-cell">
                                {new Date(u.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {u.id !== user.id && (
                                    <>
                                      <Button size="sm" variant="ghost" onClick={() => toggleUserRole(u.id, u.role)} title={u.role === "ADMIN" ? "Revoke admin" : "Make admin"}>
                                        {u.role === "ADMIN" ? <ShieldOff className="h-4 w-4 text-orange-500" /> : <Shield className="h-4 w-4 text-green-500" />}
                                      </Button>
                                      <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => deleteUser(u.id)}>
                                        <UserX className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                  {u.id === user.id && <span className="text-xs text-gray-400 italic">You</span>}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Contacts Tab */}
          {activeTab === "contacts" && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Contact Submissions</h1>
                  <p className="text-gray-500 text-sm">{contacts.length} messages from customers</p>
                </div>
              </div>

              {loadingContacts ? (
                <div className="flex justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : contacts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-sm text-gray-500">Contact form submissions will appear here</p>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {contacts.map((c) => (
                    <Card key={c.id} className={`transition-all ${expandedContact === c.id ? "ring-2 ring-blue-200" : ""}`}>
                      <div className="p-3 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-sm flex-shrink-0 mt-0.5">
                              {c.firstName?.[0]?.toUpperCase()}{c.lastName?.[0]?.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{c.firstName} {c.lastName}</h4>
                              <p className="text-xs sm:text-sm text-gray-500 truncate">{c.email}{c.phone ? ` • ${c.phone}` : ""}</p>
                              {c.carTitle && <p className="text-xs text-blue-600 mt-1 truncate">Re: {c.carTitle}</p>}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0 flex-shrink-0">
                            <span className="text-xs text-gray-400 hidden sm:flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(c.createdAt).toLocaleDateString()}</span>
                            <Button size="sm" variant="ghost" onClick={() => setExpandedContact(expandedContact === c.id ? null : c.id)}>
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => deleteContact(c.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {expandedContact === c.id && (
                          <div className="mt-4 pl-13 border-t pt-4">
                            {c.comment ? (
                              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{c.comment}</p>
                            ) : (
                              <p className="text-sm text-gray-400 italic">No message provided</p>
                            )}
                            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                              {c.hasTradeIn && <span className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" />Has trade-in</span>}
                              <span>Submitted {new Date(c.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Forms Tab */}
          {activeTab === "forms" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Form Submissions</h1>
                  <p className="text-gray-500 text-sm">{forms.length} total submissions{stats?.newForms > 0 && <span className="ml-2 text-blue-600 font-medium">({stats.newForms} new)</span>}</p>
                </div>
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {["all", "pre-qualify", "finance", "sell-car", "get-details"].map((f) => (
                    <Button key={f} size="sm" variant={formFilter === f ? "default" : "outline"} className="whitespace-nowrap text-xs sm:text-sm flex-shrink-0" onClick={() => setFormFilter(f)}>
                      {f === "all" ? "All" : f.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </Button>
                  ))}
                </div>
              </div>

              {loadingForms ? (
                <div className="flex justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : (
                <div className="grid gap-3">
                  {forms.filter(f => formFilter === "all" || f.formType === formFilter).map((f) => (
                    <Card key={f.id} className={`transition-all ${expandedForm === f.id ? "ring-2 ring-blue-200" : ""}`}>
                      <div className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 ${
                              f.formType === "pre-qualify" ? "bg-blue-100 text-blue-600" :
                              f.formType === "finance" ? "bg-green-100 text-green-600" :
                              f.formType === "sell-car" ? "bg-orange-100 text-orange-600" :
                              "bg-purple-100 text-purple-600"
                            }`}>
                              <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{f.firstName} {f.lastName}</h4>
                              <p className="text-xs sm:text-sm text-gray-500 truncate">{f.email}{f.phone ? ` • ${f.phone}` : ""}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto sm:ml-0 flex-shrink-0">
                            <Badge variant={f.formType === "pre-qualify" ? "default" : f.formType === "finance" ? "success" : f.formType === "sell-car" ? "warning" : "secondary"} className="text-xs">
                              {f.formType || "unknown"}
                            </Badge>
                            <Badge variant={f.status === "new" ? "default" : f.status === "reviewed" ? "secondary" : f.status === "contacted" ? "success" : "outline"} className="text-xs">
                              {f.status}
                            </Badge>
                            <span className="text-xs text-gray-400 hidden md:flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(f.createdAt).toLocaleDateString()}</span>
                            <Button size="sm" variant="ghost" onClick={() => setExpandedForm(expandedForm === f.id ? null : f.id)}>
                              <ChevronDown className={`h-4 w-4 transition-transform ${expandedForm === f.id ? "rotate-180" : ""}`} />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteForm(f.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {expandedForm === f.id && (
                          <div className="mt-4 border-t pt-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                              {f.vehicleType && <div><span className="text-gray-400">Vehicle:</span> <span className="font-medium text-gray-900">{f.vehicleType}</span></div>}
                              {f.preferredVehicle && <div><span className="text-gray-400">Preferred:</span> <span className="font-medium text-gray-900">{f.preferredVehicle}</span></div>}
                              {f.budget && <div><span className="text-gray-400">Budget:</span> <span className="font-medium text-gray-900">{f.budget}</span></div>}
                              {f.hasTradeIn && <div><span className="text-gray-400">Trade-in:</span> <span className="font-medium text-gray-900">{f.hasTradeIn}</span></div>}
                              {f.creditRating && <div><span className="text-gray-400">Credit:</span> <span className="font-medium text-gray-900">{f.creditRating}</span></div>}
                              {f.employmentStatus && <div><span className="text-gray-400">Employment:</span> <span className="font-medium text-gray-900">{f.employmentStatus}</span></div>}
                              {f.annualIncome && <div><span className="text-gray-400">Income:</span> <span className="font-medium text-gray-900">{f.annualIncome}</span></div>}
                              {f.monthlyPayment && <div><span className="text-gray-400">Monthly:</span> <span className="font-medium text-gray-900">{f.monthlyPayment}</span></div>}
                              {f.companyName && <div><span className="text-gray-400">Company:</span> <span className="font-medium text-gray-900">{f.companyName}</span></div>}
                              {f.jobTitle && <div><span className="text-gray-400">Job:</span> <span className="font-medium text-gray-900">{f.jobTitle}</span></div>}
                              {f.homeStatus && <div><span className="text-gray-400">Home:</span> <span className="font-medium text-gray-900">{f.homeStatus}</span></div>}
                              {f.dob && <div><span className="text-gray-400">DOB:</span> <span className="font-medium text-gray-900">{f.dob}</span></div>}
                              {f.address && <div className="col-span-2"><span className="text-gray-400">Address:</span> <span className="font-medium text-gray-900">{f.address}{f.postalCode ? `, ${f.postalCode}` : ""}</span></div>}
                              {f.carTitle && <div><span className="text-gray-400">Car:</span> <span className="font-medium text-blue-600">{f.carTitle}{f.carPrice ? ` ($${f.carPrice.toLocaleString()})` : ""}</span></div>}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4">
                              <span className="text-xs text-gray-500">Status:</span>
                              {["new", "reviewed", "contacted", "closed"].map((s) => (
                                <Button key={s} size="sm" variant={f.status === s ? "default" : "outline"} className="text-xs" onClick={() => updateFormStatus(f.id, s)}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  {forms.filter(f => formFilter === "all" || f.formType === formFilter).length === 0 && (
                    <Card className="p-12 text-center">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No form submissions</h3>
                      <p className="text-sm text-gray-500">Submissions from pre-qualify, finance, and get-details forms will appear here</p>
                    </Card>
                  )}
                </div>
              )}
            </>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Reviews</h1>
                  <p className="text-gray-500 text-sm">{adminReviews.length} reviews ({adminReviews.filter(r => r.isVisible).length} visible)</p>
                </div>
                <Button onClick={() => openReviewModal()} className="self-start">
                  <Plus className="h-4 w-4 mr-2" /> Add Review
                </Button>
              </div>

              {loadingReviews ? (
                <div className="flex justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
              ) : (
                <div className="grid gap-4">
                  {adminReviews.map((r, idx) => (
                    <Card key={r.id} className={`transition-all ${!r.isVisible ? "opacity-60" : ""}`}>
                      <div className="p-3 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="flex items-start gap-2 sm:gap-4 min-w-0">
                            {/* Position number */}
                            <div className="flex flex-col items-center gap-0.5 sm:gap-1 pt-1 flex-shrink-0">
                              <button
                                onClick={() => moveReview(idx, "up")}
                                disabled={idx === 0}
                                className={`p-0.5 sm:p-1 rounded hover:bg-gray-100 transition-colors ${idx === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                                title="Move up"
                              >
                                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-180 text-gray-500" />
                              </button>
                              <span className="text-xs font-bold text-gray-400 w-5 text-center">{idx + 1}</span>
                              <button
                                onClick={() => moveReview(idx, "down")}
                                disabled={idx === adminReviews.length - 1}
                                className={`p-0.5 sm:p-1 rounded hover:bg-gray-100 transition-colors ${idx === adminReviews.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                                title="Move down"
                              >
                                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                              </button>
                            </div>
                            {r.imageUrl ? (
                              <img src={r.imageUrl} alt={r.name} className="h-10 w-10 sm:h-14 sm:w-14 rounded-full object-cover flex-shrink-0" />
                            ) : (
                              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm sm:text-lg flex-shrink-0">
                                {r.name?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{r.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">{r.role}</p>
                              <div className="flex gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon key={i} className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                                ))}
                              </div>
                              <p className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-2 line-clamp-2">{r.text}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0 ml-auto sm:ml-0">
                            <Button size="sm" variant="ghost" onClick={() => toggleReviewVisibility(r)} title={r.isVisible ? "Hide from website" : "Show on website"}>
                              {r.isVisible ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => openReviewModal(r)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteReview(r.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {adminReviews.length === 0 && (
                    <Card className="p-12 text-center">
                      <StarIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                      <p className="text-sm text-gray-500">Add customer reviews to display on the website</p>
                    </Card>
                  )}
                </div>
              )}

              {/* Review Add/Edit Modal */}
              {reviewModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{editingReview ? "Edit Review" : "Add New Review"}</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Name *</label>
                          <input className="w-full border rounded-lg p-2.5 text-sm" value={reviewForm.name} onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Role</label>
                          <input className="w-full border rounded-lg p-2.5 text-sm" value={reviewForm.role} onChange={(e) => setReviewForm({...reviewForm, role: e.target.value})} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Review Text *</label>
                        <textarea rows={3} className="w-full border rounded-lg p-2.5 text-sm resize-none" value={reviewForm.text} onChange={(e) => setReviewForm({...reviewForm, text: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 block">Rating</label>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map((r) => (
                              <button key={r} onClick={() => setReviewForm({...reviewForm, rating: r})}>
                                <StarIcon className={`h-6 w-6 ${r <= reviewForm.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={reviewForm.isVisible} onChange={(e) => setReviewForm({...reviewForm, isVisible: e.target.checked})} className="w-4 h-4" />
                            <span className="text-sm text-gray-700">Visible on website</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Review Image</label>
                        {/* Image preview */}
                        {reviewForm.imageUrl && (
                          <div className="relative mb-3 inline-block group">
                            <img src={reviewForm.imageUrl} alt="Review" className="h-24 w-24 rounded-xl object-cover border" />
                            <button
                              type="button"
                              onClick={() => setReviewForm({...reviewForm, imageUrl: ""})}
                              className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                        {/* Upload button */}
                        <label className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                          <Upload className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">Click to upload image (JPEG, PNG, WebP)</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              try {
                                const { storage } = await import("@/lib/firebase");
                                const { ref, uploadString, getDownloadURL } = await import("firebase/storage");
                                if (!storage) return;
                                // Convert to WebP
                                const img = new window.Image();
                                img.onload = async () => {
                                  const canvas = document.createElement("canvas");
                                  const MAX_W = 800;
                                  let w = img.width, h = img.height;
                                  if (w > MAX_W) { h = Math.round(h * (MAX_W / w)); w = MAX_W; }
                                  canvas.width = w;
                                  canvas.height = h;
                                  const ctx = canvas.getContext("2d");
                                  ctx.drawImage(img, 0, 0, w, h);
                                  const dataUrl = canvas.toDataURL("image/webp", 0.85);
                                  const fileName = `reviews/${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
                                  const storageRef = ref(storage, fileName);
                                  await uploadString(storageRef, dataUrl, "data_url", { contentType: "image/webp" });
                                  const url = await getDownloadURL(storageRef);
                                  setReviewForm((prev) => ({...prev, imageUrl: url}));
                                };
                                img.src = URL.createObjectURL(file);
                              } catch (err) {
                                console.error("Image upload failed:", err);
                              }
                            }}
                          />
                        </label>
                        <p className="text-xs text-gray-400 mt-1.5">Or paste an image URL below:</p>
                        <input className="w-full border rounded-lg p-2.5 text-sm mt-1" placeholder="https://..." value={reviewForm.imageUrl} onChange={(e) => setReviewForm({...reviewForm, imageUrl: e.target.value})} />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                      <Button variant="outline" onClick={() => setReviewModal(false)}>Cancel</Button>
                      <Button onClick={saveReview} disabled={!reviewForm.name || !reviewForm.text}>{editingReview ? "Save Changes" : "Add Review"}</Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
                <p className="text-gray-500 text-sm">Manage your account and preferences</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Name</span>
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Email</span>
                      <span className="text-sm font-medium text-gray-900">{user.email}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Role</span>
                      <Badge variant="success">{user.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">System Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Total Cars</span>
                      <span className="text-sm font-medium text-gray-900">{stats?.totalListings ?? "..."}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Total Users</span>
                      <span className="text-sm font-medium text-gray-900">{stats?.activeUsers ?? "..."}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Contact Messages</span>
                      <span className="text-sm font-medium text-gray-900">{stats?.totalContacts ?? "..."}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500">Backend Port</span>
                      <span className="text-sm font-medium text-gray-900">5001</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>

        {/* Modals */}
        <CarFormModal
          isOpen={showCarForm}
          onClose={() => { setShowCarForm(false); setEditingCar(null); }}
          onSaved={() => { fetchCars(); fetchStats(); }}
          editCar={editingCar}
        />
        <DeleteModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          carTitle={deleteTarget?.title}
          loading={deleteLoading}
        />
        <CsvUploadModal
          isOpen={showCsvUpload}
          onClose={() => setShowCsvUpload(false)}
          onImported={() => { fetchCars(); fetchStats(); }}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
