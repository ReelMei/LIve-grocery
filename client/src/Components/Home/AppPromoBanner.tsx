import { appPromoBannerData, assets } from "../../assets/assets"


const AppPromoBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-10">

            {/* LEFT */}

            <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                    {appPromoBannerData.title}
                </h2>
                <p className="text-white/70 mb-6 max-w-md">
                    {appPromoBannerData.description}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button className="px-6 py-3 bg-white text-gray-950 font-semibold rounded-xl hover:bg-amber-400 ">App Store</button>
                    <button className="px-6 py-3 bg-white/10 text-taupe-200 font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">Google Play</button>
                </div>
            </div>

            {/* RIGHT */}
        <img src={assets.delivery_truck} alt="delivery truck" className="max-w-60 sm:max-w-120 xl:pr-10"/>

        </div>
    </section>
  )
}

export default AppPromoBanner
