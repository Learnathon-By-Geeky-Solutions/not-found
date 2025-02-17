import React, { useState } from 'react'
import {useNavigate, useParams } from 'react-router'
import { createLease } from '../lib/api'

const Lease = () => {
    const { tenantId } = useParams();
    const [apartment, setApartment] = useState("");
    const [rent, setRent] = useState(0);
    const [startMonth, setStartMonth] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createLease({tenantId, apartmentId: apartment, rent, startMonth});
            if(response && response.data.success) {
                setApartment("");
                setStartMonth("");
                setRent(0);
                navigate('/');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }
  
  
    return (
    <div className="flex flex-col items-center pt-8">
        <h1 className="text-3xl font-bold">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 my-8 bg-amber-200 px-10 py-8">
            <div className="flex flex-col space-y-2">
                <label htmlFor="aprtment" className="font-semibold">Apartment ID</label>
                <input type="text" id="aprtment" name="aprtment" className="px-4 py-2 bg-white rounded" value={apartment} onChange={(e) => setApartment(e.target.value)}/>
            </div>
            
            <div className="flex flex-col space-y-2">
                <label htmlFor="rent" className="font-semibold">Rent Amount</label>
                <input type="text" id="rent" name="rent" className="px-4 py-2 bg-white rounded" value={rent} onChange={(e) => setRent(parseInt(e.target.value))}/>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="startMonth" className="font-semibold">Start Month</label>
                <input type="text" id="startMonth" name="startMonth" className="px-4 py-2 bg-white rounded" value={startMonth} onChange={(e) => setStartMonth(e.target.value)}/>
            </div>

            {error && <p className="text-red-400">{error}</p>}
            <button type="submit"  className="cursor-pointer border border-black py-2 rounded bg-red-400 mt-4">Submit</button>
        </form>
    </div>
  )
}

export default Lease