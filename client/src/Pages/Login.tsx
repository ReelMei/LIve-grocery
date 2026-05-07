import React, { useState } from "react"
import { heroSectionData } from "../assets/assets"
import { Link } from "react-router-dom"
import { BikeIcon, Loader2Icon, Lock, MailIcon, UserIcon } from "lucide-react"

const Login = () => {
    const [isLoginState, setIsLoginState] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.SubmitEvent)=> {
        e.preventDefault()
        setLoading(true);
        setTimeout(() => window.location.href = "/", 1000)
    }


  return (
    <div className="min-h-screen flex">
        {/* left side */}

    <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img src={heroSectionData.hero_image} alt="hero" className="absolute inset-0 object-cover h-full bg-center opacity-10" />
        <div className="relative text-center px-12">
            <h2 className="text-4xl font-semibold text-white mb-4">Welcome Back to Enzo Carts</h2>
            <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">Fresh Groceries and organic produce, delivered to your doorstep.</p>
        </div>
    </div>


    {/* right side */}

    <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 mb-6">
                  <BikeIcon className="text-app-green size-8"/>
                  <span className="text-2xl font-semibold text-app-green">Enzo Cart's</span>
                </Link>
                <h1 className="text-2xl font-semibold text-app-green mb-2">
                    {isLoginState ? "Login to your account" : "Create a new account"}
                </h1>
                <p className="text-sm text-app-text-light"> 
                    {isLoginState ? "Don't have an account?" : "Already have an account?"} 
                    <button onClick={() => setIsLoginState(!isLoginState)} className="text-orange-500 ml-1 font-semibold hover:text-orange-700 transistion-colors">
                        {isLoginState ? "Create An Account" : "Login "}
                    </button>
                </p>
            </div>

            {/* LOgin form */}

            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLoginState && (
                    <label className="text-sm flex flex-col gap-1">
                        Name
                        <div className="relative"> 
                            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light"/>
                            <input 
                            type="text" 
                            value={name} onChange={(e) => setName(e.target.value)} 
                            required
                            placeholder="Name"
                            className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transistion-all" />
                        </div>
                    </label>
                )}
                <label className="text-sm flex flex-col gap-1">
                        Email
                        <div className="relative"> 
                            <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light"/>
                            <input 
                            type="email" 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                            required
                            placeholder="Email"
                            className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transistion-all" />
                        </div>
                    </label>
                    <label className="text-sm flex flex-col gap-1">
                        Password
                        <div className="relative"> 
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light"/>
                            <input 
                            type="password" 
                            value={password} onChange={(e) => setPassword(e.target.value)} 
                            required
                            placeholder="Password"
                            className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transistion-all" />
                        </div>
                    </label>

                    <button type="submit" disabled={loading} className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50">
                        {loading ? <Loader2Icon className="animate-spin" /> : isLoginState ? "Login" : "Create Account"}
                    </button>
            </form>


        </div>
    </div>
    </div>
  )
}

export default Login
