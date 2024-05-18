import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/criar-receita'>Criar Receita</Link>
        <Link to='/receitas-salvas'>Receitas Salvas</Link>
        <Link to='/auth'>Login/Cadastro</Link>
    </div>
  )
}

