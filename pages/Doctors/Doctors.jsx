import DoctorCard from '../../components/Doctorcard';
import {doctors} from '../../assets/data/merged_file.js'
import Doctorcard from '../../components/Doctorcard';
import { t } from 'i18next';
import { useState } from 'react';
import useFetchData from '../../../../backend/hooks/useFetchData.jsx';

const Doctors = () => {
  const [query, setQuery] = useState('');
  const handleSearch=()=>{
    setQuery(query.trim());
  }

  const {data:doctor , loading, error}= useFetchData(`http://localhost:5000/api/v1/doctor?query=${query}`)


  return (
    <>
    <section className="bg-[#fff9ea]">
      <div className='container text-center'>
        <h2 className='heading'>
        {t("heading1")}
        </h2>
        <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
        <input type='search' placeholder={t("pla")} className='w-full py-4 pl-2 pr-2 focus:outline-none cursor-pointer placeholder:text-head bg-transparent outline-none' value={query} onChange={e=>setQuery(e.target.value)}/>
        <button className='btn bg-[#0066ff] mt-0  text-white py-4 px-4 rounded-md' onClick={handleSearch}>{t("sea")}</button>
        </div>
      </div>
    </section>
    <secton>
    <div className='container'>
      {!loading && !error &&(<div className='grid grid-cols-1 md:grid-cols-2md:grid-col-3 gap-6 lg:grid-cols-4'>
        
          {doctor.slice(0,14).map(doctor=>(
          <DoctorCard key={doctor.id} doctor={doctor}/>

           )) }
      </div>
      )}
    </div>
    </secton>
    <section>
      <div className='container '>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:">
      {
        doctors.slice(0,10).map((doctor)=>{
            return <Doctorcard key={doctor.id} doctor={doctor}/>
        })
      }
        </div>
      </div>
    </section>
    </>
  )
}

export default Doctors;