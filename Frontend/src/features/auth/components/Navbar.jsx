import React from 'react';
import { useAuth } from '../hooks/useAuth';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <NavWrapper>
      <Logo onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#ff2d78' }}><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
        NextHire <span className="highlight">AI</span>
      </Logo>
      {user && (
        <UserSection>
          <WelcomeText>
            Welcome, <strong>{user.username || user.email}</strong>
          </WelcomeText>
          <LogoutButton onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Logout
          </LogoutButton>
        </UserSection>
      )}
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #161b22;
  border-bottom: 1px solid #2a3348;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e6edf3;
  cursor: pointer;
  
  .highlight {
    color: #ff2d78;
    margin-left: 2px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const WelcomeText = styled.span`
  color: #7d8590;
  font-size: 0.875rem;
  
  strong {
    color: #e6edf3;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid #2a3348;
  color: #e6edf3;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    stroke: #7d8590;
    transition: stroke 0.2s ease;
  }

  &:hover {
    background-color: rgba(255, 45, 120, 0.1);
    border-color: #ff2d78;
    color: #ff2d78;

    svg {
      stroke: #ff2d78;
    }
  }
`;

export default Navbar;
