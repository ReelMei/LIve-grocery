import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import type { Product } from "../Types";
import { categoriesData, dummyProducts } from "../assets/assets";
import { Home } from "lucide-react";

const Products = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFilterOpen] = useState(false)

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";


const fetchProducts = async ()=> {
  setLoading(true)
  setProducts(dummyProducts.filter((p)=> p.category === category || category === ""));
  setLoading(false)
}

const updateFilter = (key: string, value: string)=> {
  const newParams = new URLSearchParams(searchParams)
  if(value){
    newParams.set(key, value)
  }else {
    newParams.delete(key)
  }
  if(key !== "page"){
    newParams.delete("page")
  }
  setSearchParams(newParams)
}


const clearFilters = () => setSearchParams({})

const activeCategory = categoriesData.find((c) => c.slug === category);
const hasFilters = category || organic || minPrice || maxPrice;



useEffect(() => {
  fetchProducts()
},[category, organic, sort, page, maxPrice, minPrice])


  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Breadcrumbs */}

        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to='/' className="hover:text-app-green transition-colors">
          <Home className="size-4"/>
          </Link>
          <span>/</span>
          <span className="text-app-green font-medium">{activeCategory ? activeCategory.name : "All Products"}</span>
        </nav>

      </div>
    </div>
  )
}

export default Products
