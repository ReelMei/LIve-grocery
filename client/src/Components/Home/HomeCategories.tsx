import { Link } from "react-router-dom"
import { categoriesData } from "../../assets/assets"


const HomeCategories = () => {
  return (
    <section className="py-16">
        <div className="max-w-7xl mx-auto">
            <div>
                <h2 className="text-2xl font-semibold">Browse Our Catalogue</h2>
                <p className="text-app-text-light text-sm mt-1">Shop from a wide range of your favorite products</p>
            </div>
            <div className="flex items-center mt-8 overflow-x-scroll no-scrollbar">
                {categoriesData.map((cat) => (
                   <Link key={cat.slug} to={`/products?category=${cat.slug}`} onClick={() => window.scrollTo(0,0)} className="group flex flex-col items-center gap-3 p-4">

                    <div className="size-8 sm:size-26 sm:p-2 rounded-2xl overflow-hidden bg-orange-100/75 group-hover:ring-2 ring-orange-400/75 transition-all">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-contain rounded-full transition-all" />

                    </div>

                    <span className="text-xs font-medium text-zinc-600 text-center leading-tight">
                            {cat.name}
                        </span>

                   </Link>
                ))}
            </div>
        </div>

    </section>
  )
}

export default HomeCategories
