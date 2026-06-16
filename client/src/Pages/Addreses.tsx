import React, { useEffect, useState } from "react"
import type { Address } from "../Types"
import { dummyAddressData } from "../assets/assets"
import { Plus } from "lucide-react"

const Addreses = () => {

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({label: "", address: "", city: "", state: "", zip: "", isDefault: false})


  const resetForm = () => {
    setForm({label: "", address: "", city: "", state: "", zip: "", isDefault: false})
    setShowForm(false)
    setEditingId(null)
  }

  const handleSubmit = async(e:React.SubmitEvent) => {
    e.preventDefault()
  }

  const onEditHandler = (add: Address) => {
    setForm({label: add.label, 
            address: add.address,
            city: add.city,
            state: add.state,
            zip: add.zip,
            isDefault: add.isDefault})
    setEditingId(add._id)
    setShowForm(true)
  }

useEffect(()=> {
  setAddresses(dummyAddressData)
  setTimeout(() => setLoading(false), 1000)
},[])



  return (
    <div className="min-h-screen bg-app-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-app-green">My Addresses</h1>
            <button className="px-4 py-2 flex gap-2 items-center font-semibold bg-app-green text-white text-sm rounded-xl hover:bg-app-green-light transition-colors">
              <Plus className="size-4"/> Input Your Address
            </button>
        </div>
      </div>
    </div>
  )
}

export default Addreses
