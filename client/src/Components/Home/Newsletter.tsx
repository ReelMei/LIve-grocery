import { Mail } from "lucide-react"


const Newsletter = () => {
  return (
    <section className="bg-white py-18 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto shadow-xs mt-32 mb-20">
        <div className="max-w-2xl mx-auto text-center">
            <div className="size-16 bg-zinc-100 rounded-xl flex flex-center mx-auto mb-6">
                <Mail className="size-8 text-app-green" strokeWidth={1.5}/>
            </div>
            <h2 className="text-3xl font-semibold text-app-green mb-4">Suscribe To Our Newsletter</h2>
            <p className="text-gray-600 mb-8 text-base">Get Weekly updates on Fresh Farm Produce, seasonal and exclusive discpunts, deals and more!</p>

            <form onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" className="border border-app-green rounded-xl py-3.5 px-4 flex-1 focus:outline-none focus:ring text-sm focus:border-app-green transition-all" placeholder="Enter your email" required/>

                <button type="submit" className="bg-app-green text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors">
                    Subscribe
                </button>
            </form>
        </div>
    </section>
  )
}

export default Newsletter
