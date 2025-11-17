import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { useLoaderData } from 'react-router';
const Converage = () => {
    const position = [23.68, 90.35]
    const mapRef=useRef()
    const serviceCenters = useLoaderData()
    const handleSearch=(e)=>{
        e.preventDefault()
        const searchValue = e.target.search.value.toLowerCase()
        console.log(searchValue)
       const district = serviceCenters.find(center=>center.district.toLowerCase().includes(searchValue))
       const cood = [district.latitude,district.longitude]
       mapRef.current.flyTo(cood,14)
    }
    return (
        <div>
            <h1 className='text-6xl font-extrabold'>We are available in 64 districts</h1>
            <div>
                <div className="">
                    <div>
                        <form onSubmit={handleSearch} className="input join ml-10 my-5 validator  join-item">
                            <input name='search' type="text" placeholder="Search here" />
                             <button className="btn btn-neutral join-item">Search</button>
                        </form>
                        <div className="validator-hint hidden">Search</div>
                    </div>
                   
                </div>
            </div>
            {/* map  */}
            <div>
                <h2 className='text-3xl font-extrabold'>We deliver almost all over Bangladesh</h2>
                <div className='border min-h-96 my-5'>
                    <MapContainer ref={mapRef} className='w-full h-[550px]' center={position} zoom={7} scrollWheelZoom={false} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            serviceCenters.map(center => <Marker position={[center.latitude, center.longitude]}>
                                <Popup>
                                    <strong>{center.district}</strong> <br /> {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>)
                        }
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Converage;