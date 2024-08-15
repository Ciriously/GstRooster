import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './shared/Header'
import Table from './components/Table'

function App() {

  return (
    <div>
      <div className='mb-20'>
        <Header />
      </div>

      <Table />
    </div>
  )
}

export default App
