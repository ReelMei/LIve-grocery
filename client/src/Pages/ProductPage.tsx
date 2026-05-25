import { Link, useNavigate, useParams } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { useEffect, useState } from "react"
import type { Product } from "../Types"
import { dummyProducts } from "../assets/assets"
import Loading from "../Components/Loading"
import { ArrowLeft, Home, Leaf } from "lucide-react"

const ProductPage = () => {

  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₦"

  const { id } = useParams()
  
  const navigate = useNavigate()

  const {items, addToCart, updateQuantity, removeFromCart} = useCart()

  const [product, setProduct] = useState<Product | null>(null)

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  const [loading, setLoading] = useState(true);

  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    setLoading(true)
    setLocalQuantity(1);
    window.scrollTo(0,0)
    const product = dummyProducts.find((p) => p._id === id)
    setProduct(product!)
    setRelatedProducts(dummyProducts.filter((p) => p._id !== id ))
    setLoading(false)

  }, [id, navigate])

  if(loading) return <Loading />
  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id)
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity

 const categoryLabel = product.category.replace(/-/g, " ");

   

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* BreadCrumbs */}

        <nav className="flex items-center gap-2 text-sm text-app-text-light mb-6">
          <Link to='/' className="hover:text-app-green transition-colors">
           
           <Home className="size-4"/>

          </Link>

           <span>/</span>

           <Link to='/products' className="hover:text-app-green transition-colors">
           
           Products

          </Link>

          <span>/</span>

          <Link to={`/products?category=${product.category}`} className="hover:text-app-green transition-colors capitalize">
           
          {categoryLabel}

          </Link>

          <span>/</span>
          <span className="text-app-green font-medium truncate max-w-50 ">{product.name}</span>

        </nav>

         {/* BackButton */}

         <button onClick={() => navigate(-1)}
         className="mb-6 items-center text-sm text-app-text-light hover:text-app-green transitions-colors flex gap-1.5">
          <ArrowLeft className="size-4"/> Return
         </button>


          {/* Product Details Section */}
           <div className="bg-white/50 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
               {/* LeftSide */}
               <div className="relative flex-center p-8 md:p-12 min-h-80 md:min-h-120">
                <img src={product.image} alt={product.name} className="w-auto object-contain max-h-90" />

                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                  {product.isOrganic && (
                    <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-app-green text-white rounded-full">
                      <Leaf className="w-3 h-3"/>
                      Organic
                    </span>
                  )}
                  { product.discount > 0 && (
                    <span className="px-2.5 py-1 text-xs font-semibold bg-app-orange text-white rounded-full">
                        {product.discount} % OFF
                    </span>
                  )

                  }
                </div>

               </div>
                


                {/* RightSide */}

                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="text-xs capitalize font-medium text-app-text-light tracking-wider mb-2">
                    {categoryLabel}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-semibold text-app-green mb-3">
                    {product.name}
                  </h1>
                </div>

            </div>
           </div>



           {/* Customer Reviews */}



            {/* Related Products */}



      </div>
    </div>
  )
}

export default ProductPage
