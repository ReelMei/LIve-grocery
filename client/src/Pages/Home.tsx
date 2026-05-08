import Features from "../Components/Home/Features"
import Hero from "../Components/Home/Hero"


const Home = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-4 sm:p-6 lg:px-8 py-12">
     <Hero />
     <Features />
    </div>
  )
}

export default Home
