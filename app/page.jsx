import React from 'react'
import PersonForm from './components/PersonForm'
import Navbar from './components/Navbar'
import PersonTable from './components/PersonTable'

function page() {


  return (
    <div className='flex flex-col  my-10 mx-10 gap-10'>
      <div>
        <Navbar />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <PersonForm />
      </div>
      <div className='flex items-center justify-center'>
        <PersonTable />
      </div>
    </div>
  )
}

export default page


