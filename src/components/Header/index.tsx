import { Link } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';


import { AiFillSetting, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsBoxArrowInRight, BsPieChartFill } from 'react-icons/bs';
import { FaKey, FaTicketAlt } from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';

import { PasswordModalF, ModalHandlesPassword } from './Parts/PasswordModal';

import Logo2 from '../../assets/images/logo2.webp';

import {
  Container,
  Content,
  Menu,
  MenuContent,
} from './styles';

export function Header() {
  const { signOut } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const modalPasswordHandlesRef = useRef<ModalHandlesPassword>({} as ModalHandlesPassword);

  const handleChangePasswordOpenModal = useCallback(() => {
    modalPasswordHandlesRef.current?.handleOpenChangePasswordModal();
    setMenuOpen(false)
  }, []);

  return (
    <>
      <Container>
        <Content dropdown={dropdown}> 
          <div>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu />
            </button>
          </div>
          <div>
            <Link to="#" className="button_disabled">Dashboard</Link>
            <Link to="#" className="button_disabled">Pedidos</Link>
            <Link to="#" className="button_disabled">Produtos</Link>
            <Link to="#" className="button_disabled">Marketplaces</Link>
          </div>
          <div>
            <button>
              <IoIosNotifications />
            </button>
            <div onClick={() => setDropdown(!dropdown)}>
              <AiFillSetting />

              <div className="dropdown-menu">
                <Link to="/configuracoes">Configurações</Link>
                <button onClick={signOut}>Sair da conta</button>
              </div>
            </div>
            <button onClick={signOut} title="Sair da conta">
              <BsBoxArrowInRight />
            </button>
          </div>
        </Content>
        {menuOpen && (
        <Menu>
          <MenuContent>
            <header>
              <img src={Logo2} alt="Logo da KillerBee" />
              <h2>KillerBee</h2>
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
              <Link to="/marketplaces">
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
              <button type="button" onClick={handleChangePasswordOpenModal}>
                <span><FaKey /> Mudar senha</span>
              </button>
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
        
        <PasswordModalF
          ref={modalPasswordHandlesRef}
        />
      </Container>
    </>
  )
}