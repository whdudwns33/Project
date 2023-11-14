import React, { useState } from 'react';
import styled from 'styled-components';
// import bookInTheForest from '../../../assets/images/theme/bookInTheForest.jpg'
import theme3 from '../../../assets/images/theme/bookInTheForest.jpg'

const ThemeContainer = styled.div`
    
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    justify-content: center;
    background-color: black;
    img{
        display: block;
        width: 90%;
        height: 40vw;
        border-radius: 0;    
    }
`;

const PhraseContainer = styled.div`
    
    
`

const ThemeBox = () => {

    return (
    <>
    <ThemeContainer>
        <img src={theme3} alt="테마 이미지" />
    </ThemeContainer>
    </>
    );
};

export default ThemeBox;