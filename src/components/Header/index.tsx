import { Link } from 'react-router-dom';

import { AiFillSetting, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsBoxArrowInRight, BsPieChartFill } from 'react-icons/bs';
import { FaKey, FaTicketAlt } from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi';
import { IoIosNotifications } from 'react-icons/io';

import {
  Container,
  Content,
  Menu,
  MenuContent,
} from './styles';
import { useCallback, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { PasswordModal } from './Parts/PasswordModal';
import { AxiosError } from 'axios';
import { api } from '../../services/api';

import Logo2 from '../../assets/images/logo2.png';

export function Header() {
  const { signOut } = useAuth();
  
  const [menuOpen, setMenuOpen] = useState(false);

  // Partial password modal
  const [changePasswordError, setChangePassworderror] = useState('');
  const [changePasswordLoader, setChangePasswordLoader] = useState(false);
  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false);

  const handleUpdatePassword = useCallback((data) => {
    setChangePasswordLoader(true);

    if(data.new_password_confirm.length  < 8 || data.new_password.length < 8)   {
      setChangePassworderror('Mínimo de 8 digitos para nova senha');
      setChangePasswordLoader(false);
      return;
    } else {
      api.put('/user/changePassword', data).then(response => {
        setModalPasswordIsOpen(false);
        setChangePassworderror('');
      }).catch((error: AxiosError) => {
        setChangePassworderror(error.response?.data.error_message);
      }).finally(() => {
        setChangePasswordLoader(false);
      });
    };

  }, []);

  return (
    <Container>
      <Content> 
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu />
          </button>
          <h2>Killerbee</h2>
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
            <img src={Logo2} alt="Logo da KillerBee" />
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
            <button type="button" onClick={() => {
              return (
                setModalPasswordIsOpen(true),
                setMenuOpen(false)
              )
            }}>
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
      
      <PasswordModal 
        handleUpdatePassword={handleUpdatePassword}
        modalPasswordIsOpen={modalPasswordIsOpen}
        setModalPasswordIsOpen={setModalPasswordIsOpen}
        changePasswordError={changePasswordError}
        changePasswordLoader={changePasswordLoader}
      />
    </Container>
  )
}