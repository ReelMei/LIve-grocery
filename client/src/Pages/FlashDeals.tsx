import { useEffect, useState } from "react"
import type { Product } from "../Types"
import { dummyProducts } from "../assets/assets"
import { Zap } from "lucide-react"
import Loading from "../Components/Loading"
import ProductCard from "../Components/Home/ProductCard"

const FlashDeals = () => {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setProducts(dummyProducts.filter((p: any) => p.stock > 0  ))
    setTimeout(() => setLoading(false), 1000)
  }, [])


  return (
    <div className="min-h-screen bg-app-cream ">
      
    {/* Banner */}

    <div className="bg-linear-to-r from-app-orange to-app-orange-dark text-white py-10">
      <div className="max-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex-center gap-2 ,b-3">
          <Zap className="size-6 fill-white"/>
          <h1 className="text-sxl font-semibold">Flash Deals</h1>
          <Zap className="size-6 fill-white"/>
        </div>
        <p className="text-white/80 max-w-md m-auto mt-2">Limited-time offers on your favourite organic products. Grab your portions before they are over with...</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (<Loading />) : (
        products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-6 mx-auto mb-4 text-app-border"/>
            <h2 className="text-lg font-semibold text-app-green mb-2">No new deals at the moment....</h2>
            <p className="text-sm text-app-text-light">Try again soon for amzing offers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => product.stock > 0 && (
              <ProductCard key={product._id} product={product}/>
            ))}
          </div>
        )
      )}
    </div>


    </div>
  )
}

export default FlashDeals
