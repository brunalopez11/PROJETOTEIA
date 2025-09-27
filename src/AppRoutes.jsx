import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import { ContainerForm } from './components/ContainerForm'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import { LoginPage } from './pages/Login'
import { CadastroPage } from './pages/Cadastro'
import { DashboardPage } from './pages/Dashboard'
import { SobrePage } from './pages/Sobre'
import { ContatoPage } from './pages/Contato'

{/*roteamento da aplicação*/}

function AppRoutes() {

  return (
     <BrowserRouter>
    <Routes>
       <Route path="/" element={<DashboardPage />} />   {/*determina qual página será renderizada em um 
       determinado path*/}
      <Route path="/login" element={<LoginPage />} />   
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/sobre" element={<SobrePage />} />
       <Route path="/contato" element={<ContatoPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default AppRoutes
