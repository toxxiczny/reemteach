import styled from 'styled-components/macro'

export default styled.ul`
    width: 100%;
    min-height: 100vh;
    padding: 80px 50px 50px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 500px) {
        padding: 80px 30px 50px 30px;
    }
`
