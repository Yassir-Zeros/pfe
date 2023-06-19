import React from 'react';
import styled from 'styled-components';

const CustomOutlineButton = styled.button`
  background: transparent;
  color: ${props => (props.disabled ? 'gray' : '#476F66')};
  border: 1px solid ${props => (props.disabled ? 'gray' : '#476F66')};
  border-radius: 4px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  &:hover {
    background-color: ${props => (props.disabled ? 'gray' : '#476F66')};
    color: white;
  }
`;

const PurpleOutlineButton = ({ children, disabled, onClick, type,datToggle,dataTarget,dataDismiss,className}) => {
  return (
    <CustomOutlineButton disabled={disabled} onClick={onClick} type={type} className={className} data-bs-toggle={datToggle} data-bs-target={dataTarget} data-bs-dismiss={dataDismiss}>
      {children}
    </CustomOutlineButton>
  );
};

export default PurpleOutlineButton;
