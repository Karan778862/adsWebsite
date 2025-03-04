import { useEffect, useState } from "react";
import axios from "axios";
import { ADS_API } from "../utils/ApiLinks";

export default function Admin() {
    const [ads, setAds] = useState([]);
    const [input, setInput] = useState({
        title:"",
        imageUrl:"",
        targetUrl:""
    });
   
 
const changeHandler = (e)=>{
   setInput({...input,[e.target.name]: e.target.value})
}




    useEffect(() => {
        axios.get("https://desiads.onrender.com/api/getads").then((res) => {
            setAds(res.data);
        });
    }, []);

    const handleAddAd =async () => {
        try {
            const res = await axios.post(`${ADS_API}/ads`,input,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true
            })
            
        } catch (error) {
            console.log("ads post erroe", error)
        }
        
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            <div className="mb-4">
                <input type="text" placeholder="Ad Title" name="title" value={input.title} onChange={changeHandler} className="border p-2 mr-2" />
                <input type="text" placeholder="Image URL" name="imageUrl" value={input.imageUrl} onChange={changeHandler} className="border p-2 mr-2" />
                <input type="text" placeholder="Target URL" name="targetUrl" value={input.targetUrl} onChange={changeHandler } className="border p-2 mr-2" />
                
                <button onClick={handleAddAd} className="bg-green-500 text-white px-4 py-2 rounded">Add Ad</button>
            </div>

            <h2 className="text-xl font-semibold mb-2">Existing Ads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ads.map((ad) => (
                    <div key={ad._id} className="border  items-center flex p-2 gap-4 rounded shadow-lg">
                        <img src={ad.imageUrl} alt={ad.title} className="w-[20%]  object-cover " />
                        <h2 className="text-lg   font-semibold">{ad.title}</h2>
                        <p className="text-right text-sm text-gray-400">Clicks: {ad.clicks} | Impressions: {ad.impressions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
