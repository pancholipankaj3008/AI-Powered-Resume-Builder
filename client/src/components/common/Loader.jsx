import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <span />
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #07080a;

  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    position: relative;
    border-radius: 50%;
    height: 96px;
    width: 96px;
    animation: rotate_3922 1.2s linear infinite;
    background-image: linear-gradient(#CB0000, #FFC700, #c79c00);
  }

  .container span {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background-image: linear-gradient(#CB0000, #FFC700, #c79c00);
  }

  .container span:nth-of-type(1) {
    filter: blur(5px);
  }

  .container span:nth-of-type(2) {
    filter: blur(10px);
  }

  .container span:nth-of-type(3) {
    filter: blur(25px);
  }

  .container span:nth-of-type(4) {
    filter: blur(50px);
  }

  .container::after {
    content: "";
    position: absolute;
    inset: 10px;
    background: #07080a; /* Dark center */
    border: 5px solid #07080a;
    border-radius: 50%;
  }

  @keyframes rotate_3922 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
