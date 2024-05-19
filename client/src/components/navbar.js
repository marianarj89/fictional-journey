import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const logout = () => {
    removeCookie('access_token');
    window.localStorage.removeItem("userID");
    window.location.reload();
  }

  return (
    <div className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/criar-receita'>Criar Receita</Link>
        <Link to='/receitas-salvas'>Receitas Salvas</Link>
        {!cookies.access_token ? (<Link to='/auth'>Login/Cadastro</Link>) : <button onClick={logout}> Logout </button>}
        {/* <Link to='/auth'>Login/Cadastro</Link> */}
    </div>
  )
}

