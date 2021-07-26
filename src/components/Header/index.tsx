import { Link } from 'react-router-dom';

import { AiFillSetting, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsBoxArrowInRight, BsPieChartFill } from 'react-icons/bs';
import { FaTicketAlt } from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';

import {
  Container,
  Content,
  Menu,
  MenuContent,
} from './styles';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { signOut } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <Content> 
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu />
          </button>
          <h2>Killerbee</h2>
        </div>
        {menuOpen && (
        <div>
          <Link to="#" className="button_disabled">Dashboard</Link>
          <Link to="#" className="button_disabled">Pedidos</Link>
          <Link to="#" className="button_disabled">Produtos</Link>
          <Link to="#" className="button_disabled">Marketplaces</Link>
        </div>
        )}
        <div>
          <button>
            <IoIosNotifications />
          </button>
          <button>
            <AiFillSetting />
          </button>
          <button onClick={signOut}>
            <BsBoxArrowInRight />
          </button>
        </div>
      </Content>
      {menuOpen && (
      <Menu>
        <MenuContent>
          <header>
            <span>K</span>
            <h2>Killerbee</h2>
          </header>
          <section>
            <Link to="#">
              <span>
                <BsPieChartFill />
                Dashboard
              </span>
            </Link>
            <Link to="#">
              <span>
                <FaTicketAlt />
                Pedidos
              </span>
            </Link>
            <Link to="#">
              <span>
                <AiOutlineShoppingCart />
                Produtos
              </span>
            </Link>
            <Link to="#">
              <span>
                <AiOutlineShop />
                Marketplaces
              </span>
            </Link>
          </section>
          <section>
            <Link to="/configuracoes">
              <span>
                <AiFillSetting />
                Configurações
              </span>
            </Link>
            <button onClick={signOut}>
              <span>
                <BsBoxArrowInRight />
                Sair da conta
              </span>
            </button>
          </section>
        </MenuContent>
        <aside onClick={() => setMenuOpen(false)} />
      </Menu>
      )}
    </Container>
  )
}