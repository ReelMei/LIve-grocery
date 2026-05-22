import { BikeIcon, ChevronDown, Handshake, LogOutIcon, MapPinIcon, Menu, PackageIcon, Search, ShieldIcon, ShoppingBasket, ShoppingCartIcon, UserIcon, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { dummyProducts } from "../assets/assets";

const Navbar = () => {

  const user: any = { name: "Enzo", email: "enzo@example.com", isAdmin: true };
  const { cartCount, setIsCartOpen } = useCart()

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault()
    if(searchQuery.trim()){
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("")
    }
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchQuery(value);
  if (value.trim().length > 0) {
    const filtered = dummyProducts.filter((p: any) =>
      p.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 6)); // max 6 results
    setSearchOpen(true);
  } else {
    setSearchResults([]);
    setSearchOpen(false);
  }
}


  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/")
  } 

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-app-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">

        <Link to="/" className="flex items-center gap-2 text-[22px] font-medium shrink-0">
          <BikeIcon size={25} />
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-700">
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/deals' className="text-app-orange">Deals</Link>
          </div>

          {/* Search Bar */}
  <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm relative">
   <div className="relative w-full">
    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
    <input
      type="text"
      placeholder="Search..."
      className="bg-orange-50 w-full pl-8 p-2 rounded-full ring ring-app-orange/15 focus:ring-app-orange/30 outline-none"
      value={searchQuery}
      onChange={handleSearchInput}
      onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
      onFocus={() => searchQuery && setSearchOpen(true)}
    />
    </div>

  {/* Dropdown results */}
  {searchOpen && searchResults.length > 0 && (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-app-border z-50 overflow-hidden">
      {searchResults.map((product) => (
        <div
          key={product._id}
          onClick={() => {
            navigate(`/products`);
            setSearchQuery("");
            setSearchOpen(false);
          }}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 cursor-pointer transition-colors"
        >
          <img src={product.image} alt={product.name} className="size-8 rounded-lg object-cover" />
          <div>
            <p className="text-sm font-medium text-zinc-800">{product.name}</p>
            <p className="text-xs text-zinc-400">{product.category}</p>
          </div>
          <span className="ml-auto text-sm font-semibold text-app-orange">₦{product.price}</span>
        </div>
      ))}

      {/* View all results */}
      
      <div
        onClick={() => {
          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
          setSearchQuery("");
          setSearchOpen(false);
        }}
        className="px-4 py-2.5 text-xs text-center text-app-orange font-medium hover:bg-orange-50 cursor-pointer border-t border-app-border"
      >
        View all results for "{searchQuery}"
      </div>
    </div>
  )}

  {/* No results */}
  {searchOpen && searchQuery && searchResults.length === 0 && (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-app-border z-50 px-4 py-4 text-center text-sm text-zinc-400">
      No products found for "{searchQuery}"
    </div>
  )}
</form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">

            {/* Cart */}
            <button className="relative p-2 rounded-xl" onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon className="size-5 text-zinc-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-red-700 text-white text-[10px] rounded-full flex-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              {user ? (
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-2">
                  <div className="size-7 rounded-full bg-green-950 text-white flex-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="size-3 text-zinc-500" />
                </button>
              ) : (
                <div className="flex-center gap-2">
                  <Link to='/login' className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-800 transition-colors">
                    <UserIcon /> Login
                  </Link>
                  {userMenuOpen
                    ? <X className="md:hidden" onClick={() => setUserMenuOpen(false)} />
                    : <Menu className="md:hidden" onClick={() => setUserMenuOpen(true)} />
                  }
                </div>
              )}

              {/* Backdrop */}
              {userMenuOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              )}

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50">
                  {user && (
                    <div className="px-4 py-2 border-b border-app-border">
                      <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
                      <p className="text-xs text-zinc-500">{user?.email}</p>
                    </div>
                  )}

                  <div onClick={() => setUserMenuOpen(false)}>
                    {!user && <Link to="/login" className="dropdown-link"><UserIcon size={18} /> Login</Link>}
                    {user && <Link to="/orders" className="dropdown-link"><PackageIcon size={18} /> Orders</Link>}
                    {user && <Link to="/addresses" className="dropdown-link"><MapPinIcon size={18} /> Addresses</Link>}
                    <Link to="/products" className="dropdown-link"><ShoppingBasket size={18} /> Products</Link>
                    <Link to="/deals" className="dropdown-link"><Handshake size={18} /> Deals</Link>
                    {user?.isAdmin && (
                      <Link to="/admin/products" className="dropdown-link">
                        <ShieldIcon size={18} />
                        <span className="text-app-orange-dark">Admin Panel</span>
                      </Link>
                    )}
                    {user && (
                      <div className="border-t border-app-border pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors">
                          <LogOutIcon size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;