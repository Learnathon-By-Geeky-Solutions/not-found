import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router'
import { createLease, getApartments } from '../lib/api'

const Lease = () => {
    const { tenantId } = useParams();
    const [loading, setLoading] = useState(true)
    const [apartments, setApartments] = useState([]);
    const [apartmentId, setApartmentId] = useState("");
    const [rent, setRent] = useState(0);
    const [startMonth, setStartMonth] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await getApartments();
            setApartments(data.apartments);
            setLoading(false);
          } catch(error) {
            console.log(error);
          }
        }
        fetchData();
      }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createLease({tenantId, apartmentId, rent, startMonth});
            if(response && response.data.success) {
              setApartments([]);
              setApartmentId("");
              setStartMonth("");
              setRent(0);
              navigate('/');
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    }
  
  
    if(!loading){
      return (
        <div className="flex flex-col items-center pt-8">
        <h1 className="text-3xl font-bold">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 my-8 bg-amber-200 px-10 py-8">
            <div className="flex flex-col space-y-2">
                <label htmlFor="aprtments" className="font-semibold">Apartment Name</label>
                <select name="apartments" id="apartments" value={apartmentId} onChange={(e)=> setApartmentId(e.target.value)} className="p-2 bg-white rounded">
                  <option>-- Choose a Apartment --</option>
                  {apartments.map(apartment => <option key={apartment._id} value={apartment._id}>{apartment.name}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col space-y-2">
                <label htmlFor="rent" className="font-semibold">Rent Amount</label>
                <input type="text" id="rent" name="rent" className="px-4 py-2 bg-white rounded" value={rent} onChange={(e) => setRent(parseInt(e.target.value))}/>
            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="startMonth" className="font-semibold">Start Month</label>
                <input type="Month" id="startMonth" name="startMonth" className="px-4 py-2 bg-white rounded" value={startMonth} onChange={(e) => setStartMonth(e.target.value)}/>
            </div>

            {error && <p className="text-red-400">{error}</p>}
            <button type="submit"  className="cursor-pointer border border-black py-2 rounded bg-red-400 mt-4">Submit</button>
        </form>
    </div>
      )
    }
}

export default Lease