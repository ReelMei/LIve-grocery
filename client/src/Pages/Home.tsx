import AppPromoBanner from "../Components/Home/AppPromoBanner"
import Features from "../Components/Home/Features"
import Hero from "../Components/Home/Hero"
import HomeCategories from "../Components/Home/HomeCategories"
import PopularProducts from "../Components/Home/PopularProducts"


const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-4 sm:p-6 lg:px-8 py-12">
     <Hero />
     <Features />
     <HomeCategories />
     <PopularProducts />
     <AppPromoBanner />
    </div>
  )
}

export default Home
