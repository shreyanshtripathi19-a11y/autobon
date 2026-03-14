"use client";

import * as React from "react";
import {
  Car,
  Filter,
  Heart,
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
  Phone,
  Mail,
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
  ChevronLeft,
} from "lucide-react";

// Mock data for cars
const featuredCars = [
  {
    id: 1,
    title: "2023 Tesla Model 3",
    price: "$45,990",
    monthly: "$599/mo",
    mileage: "5,234 km",
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Toronto, ON",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    rating: 4.8,
    reviews: 124,
    seller: "Tesla Toronto",
    isNew: true,
  },
  {
    id: 2,
    title: "2022 BMW X5",
    price: "$68,500",
    monthly: "$899/mo",
    mileage: "12,890 km",
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Vancouver, BC",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Premium",
    rating: 4.9,
    reviews: 89,
    seller: "BMW Vancouver",
    isNew: false,
  },
  {
    id: 3,
    title: "2021 Honda CR-V",
    price: "$32,995",
    monthly: "$429/mo",
    mileage: "28,456 km",
    fuelType: "Hybrid",
    transmission: "CVT",
    location: "Calgary, AB",
    image:
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    rating: 4.7,
    reviews: 256,
    seller: "Honda Calgary",
    isNew: true,
  },
  {
    id: 4,
    title: "2023 Ford Mustang GT",
    price: "$52,750",
    monthly: "$689/mo",
    mileage: "3,201 km",
    fuelType: "Gasoline",
    transmission: "Manual",
    location: "Montreal, QC",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Hot Deal",
    rating: 4.9,
    reviews: 67,
    seller: "Ford Montreal",
    isNew: true,
  },
];

const recentCars = [
  {
    id: 5,
    title: "2022 Toyota RAV4",
    price: "$38,500",
    image:
      "https://images.unsplash.com/photo-1621007947382-9bced5c7b1f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Ottawa, ON",
    mileage: "15,678 km",
  },
  {
    id: 6,
    title: "2021 Mercedes-Benz C300",
    price: "$42,800",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Mississauga, ON",
    mileage: "22,345 km",
  },
  {
    id: 7,
    title: "2023 Hyundai Tucson",
    price: "$34,200",
    image:
      "https://images.unsplash.com/photo-1632956555796-1b56c2f6d1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    location: "Edmonton, AB",
    mileage: "8,912 km",
  },
];

const stats = [
  {
    title: "Total Listings",
    value: "2,847",
    change: "+12.5%",
    icon: Car,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "14,239",
    change: "+23.1%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Avg. Price",
    value: "$42,500",
    change: "-2.3%",
    icon: TrendingUp,
    trend: "down",
  },
  {
    title: "Saved Searches",
    value: "892",
    change: "+8.2%",
    icon: Bookmark,
    trend: "up",
  },
];

// Custom Button Component
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md";

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

  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.default;

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Card Components
const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3
    className={`font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Custom Badge Component
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
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Custom Avatar Components
const Avatar = ({ className = "", children, ...props }) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  >
    {children}
  </div>
);

const AvatarImage = ({ className = "", src, alt = "", ...props }) => (
  <img
    src={src}
    alt={alt}
    className={`aspect-square h-full w-full object-cover ${className}`}
    {...props}
  />
);

const AvatarFallback = ({ className = "", children, ...props }) => (
  <div
    className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Custom Input Component
const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Custom Label Component
const Label = ({ className = "", children, ...props }) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

// Custom Separator Component
const Separator = ({
  className = "",
  orientation = "horizontal",
  ...props
}) => (
  <div
    className={`${
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px"
    } bg-gray-200 ${className}`}
    {...props}
  />
);

// Custom Checkbox Component
const Checkbox = ({ className = "", checked, onCheckedChange, ...props }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    className={`flex h-4 w-4 items-center justify-center rounded border ${
      checked ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"
    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
    onClick={() => onCheckedChange?.(!checked)}
    {...props}
  >
    {checked && <Check className="h-3 w-3 text-white" />}
  </button>
);

// Custom Select Components
const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const selectRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={selectRef} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setOpen(!open),
            "aria-expanded": open,
          });
        }
        if (child.type === SelectContent) {
          return (
            open &&
            React.cloneElement(child, {
              onSelect: (newValue) => {
                onValueChange?.(newValue);
                setOpen(false);
              },
            })
          );
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ className = "", children, ...props }) => (
  <button
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
);

const SelectValue = ({ placeholder, value }) => (
  <span>{value || placeholder}</span>
);

const SelectContent = ({ className = "", children, onSelect, ...props }) => (
  <div
    className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg ${className}`}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (child.type === SelectItem) {
        return React.cloneElement(child, { onSelect });
      }
      return child;
    })}
  </div>
);

const SelectItem = ({
  className = "",
  children,
  value,
  onSelect,
  ...props
}) => (
  <div
    className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 ${className}`}
    onClick={() => onSelect?.(value)}
    {...props}
  >
    {children}
  </div>
);

// Custom Tabs Components
const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  className = "",
  children,
}) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    onValueChange?.(tabValue);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            activeTab,
            onTabChange: handleTabChange,
          });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ className = "", children, activeTab, onTabChange }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 ${className}`}
  >
    {React.Children.map(children, (child) => {
      if (child.type === TabsTrigger) {
        return React.cloneElement(child, {
          active: child.props.value === activeTab,
          onClick: () => onTabChange(child.props.value),
        });
      }
      return child;
    })}
  </div>
);

const TabsTrigger = ({ className = "", children, value, active, onClick }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      active
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-600 hover:text-gray-900"
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ className = "", children, value, activeTab }) =>
  activeTab === value && <div className={className}>{children}</div>;

// Custom Dropdown Menu Components
const DropdownMenu = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {React.Children.map(children, (child) => {
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, {
            onClick: () => setOpen(!open),
            "aria-expanded": open,
          });
        }
        if (child.type === DropdownMenuContent) {
          return (
            open && React.cloneElement(child, { onClose: () => setOpen(false) })
          );
        }
        return child;
      })}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const DropdownMenuContent = ({
  className = "",
  children,
  align = "end",
  onClose,
}) => (
  <div
    className={`absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md ${
      align === "end" ? "right-0" : "left-0"
    } ${className}`}
  >
    {React.Children.map(children, (child) => {
      if (child.type === DropdownMenuItem) {
        return React.cloneElement(child, {
          onClick: (e) => {
            child.props.onClick?.(e);
            onClose?.();
          },
        });
      }
      return child;
    })}
  </div>
);

const DropdownMenuLabel = ({ className = "", children }) => (
  <div className={`px-2 py-1.5 text-sm font-semibold ${className}`}>
    {children}
  </div>
);

const DropdownMenuItem = ({ className = "", children, onClick }) => (
  <div
    className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const DropdownMenuSeparator = () => <div className="my-1 h-px bg-gray-200" />;

// Custom Breadcrumb Components
const Breadcrumb = ({ children }) => (
  <nav aria-label="breadcrumb">{children}</nav>
);

const BreadcrumbList = ({ className = "", children }) => (
  <ol
    className={`flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 ${className}`}
  >
    {children}
  </ol>
);

const BreadcrumbItem = ({ className = "", children }) => (
  <li className={`inline-flex items-center gap-1.5 ${className}`}>
    {children}
  </li>
);

const BreadcrumbLink = ({ className = "", href, children }) => (
  <a
    href={href}
    className={`hover:text-gray-900 transition-colors ${className}`}
  >
    {children}
  </a>
);

const BreadcrumbPage = ({ className = "", children }) => (
  <span className={`font-medium text-gray-900 ${className}`}>{children}</span>
);

const BreadcrumbSeparator = ({ className = "" }) => (
  <li className={`[&>svg]:size-3.5 ${className}`}>
    <ChevronRight className="h-3.5 w-3.5" />
  </li>
);

// Custom Sidebar Components
const SidebarContext = React.createContext({
  collapsed: false,
  setCollapsed: () => {},
});

const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  );
};

const SidebarInset = ({ className = "", children }) => {
  const { collapsed } = React.useContext(SidebarContext);

  return (
    <main
      className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"} ${className}`}
    >
      {children}
    </main>
  );
};

const SidebarTrigger = ({ className = "" }) => {
  const { collapsed, setCollapsed } = React.useContext(SidebarContext);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => setCollapsed(!collapsed)}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
};

// AppSidebar Component (simplified version)
const AppSidebar = () => {
  const { collapsed } = React.useContext(SidebarContext);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-blue-600 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex h-16 items-center justify-center border-b border-blue-500">
        {collapsed ? (
          <Car className="h-8 w-8" />
        ) : (
          <span className="text-xl font-bold">Autobon</span>
        )}
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
            >
              <Home className="h-5 w-5" />
              {!collapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
            >
              <Car className="h-5 w-5" />
              {!collapsed && <span>Listings</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
            >
              <Users className="h-5 w-5" />
              {!collapsed && <span>Users</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span>Settings</span>}
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Plus icon component
const Plus = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin-dashboard">Admin Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inventory Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side header actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search cars..." className="w-[300px] pl-9" />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>

            {/* User dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left lg:block">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">john@autobon.ca</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  <span>History</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 space-y-6 bg-gray-50 p-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back, John! 👋
              </h1>
              <p className="text-gray-500">
                Here's what's happening with your car inventory today.
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Listing
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <p
                      className={`text-xs ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Tabs for different views */}
          <Tabs defaultValue="featured" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="featured">Featured Listings</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
                <TabsTrigger value="saved">Saved Cars</TabsTrigger>
              </TabsList>

              {/* Filter button */}
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Featured Cars Tab */}
            <TabsContent value="featured" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {featuredCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden group">
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={car.title}
                        className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <Badge className="absolute left-3 top-3">
                        {car.badge}
                      </Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {car.isNew && (
                        <Badge
                          variant="secondary"
                          className="absolute bottom-3 left-3"
                        >
                          New
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-900">
                            {car.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {car.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {car.rating}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({car.reviews})
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Gauge className="h-3 w-3" />
                          {car.mileage}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Fuel className="h-3 w-3" />
                          {car.fuelType}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Settings className="h-3 w-3" />
                          {car.transmission}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {car.title.split(" ")[0]}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4 pt-0">
                      <div>
                        <span className="text-xl font-bold text-gray-900">
                          {car.price}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          or {car.monthly}
                        </span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Cars Tab */}
            <TabsContent value="recent" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentCars.map((car) => (
                  <Card key={car.id} className="flex gap-4 p-4">
                    <img
                      src={car.image}
                      alt={car.title}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {car.title}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {car.location}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">
                          {car.mileage}
                        </span>
                        <span className="font-bold text-gray-900">
                          {car.price}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Saved Cars Tab */}
            <TabsContent value="saved" className="space-y-4">
              <Card className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No saved cars yet
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Start saving cars you're interested in and they'll appear
                  here.
                </p>
                <Button>Browse Listings</Button>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Activity Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Activity</CardTitle>
                <CardDescription>
                  Your latest interactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">New message</span> about
                          2023 Tesla Model 3
                        </p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                      <Badge variant="outline">Unread</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                <CardDescription>Frequently used operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start gap-2" variant="ghost">
                  <Plus className="h-4 w-4" />
                  Add New Listing
                </Button>
                <Button className="w-full justify-start gap-2" variant="ghost">
                  <Search className="h-4 w-4" />
                  Advanced Search
                </Button>
                <Button className="w-full justify-start gap-2" variant="ghost">
                  <Wallet className="h-4 w-4" />
                  View Payments
                </Button>
                <Button className="w-full justify-start gap-2" variant="ghost">
                  <HelpCircle className="h-4 w-4" />
                  Get Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
