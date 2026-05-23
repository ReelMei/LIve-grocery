import { useNavigate, useParams } from "react-router-dom"
import { useCart } from "../Context/CartContext"
import { useEffect, useState } from "react"
import type { Product } from "../Types"
import { dummyProducts } from "../assets/assets"
import Loading from "../Components/Loading"

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
   

  return (
    <div>
      
    </div>
  )
}

export default ProductPage
