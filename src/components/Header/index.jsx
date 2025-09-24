import './style.modules.css'
import logo from '../../assets/logoPR.png'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {


  return (
   <header>
    <div className="logo">
      <img src={logo} alt="Logo" className="logo"/>
      <a href="index.html" className="brand-name">TEIA</a>
    </div>
    <nav>
      <ul>
        {/*Link to= não baixa HTML de novo, só atualiza o que mudou*/}
        <li><Link to={"/"}>Início</Link></li>
        <li><Link to={"/login"} className="active">Login</Link></li>
        <li><Link to={"/sobre"}>Sobre</Link></li>
        <li><Link to={"/contato"}>Contato</Link></li>
      </ul>
    </nav>
  </header>
  )
}