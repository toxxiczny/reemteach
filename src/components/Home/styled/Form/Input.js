import styled from 'styled-components/macro'

export default styled.input`
    width: 100%;
    font-size: 12.5px;
    text-transform: initial;
    border-bottom: 1.5px solid white;
    padding-bottom: 14px;
    ::placeholder {
        color: white;
    }
    @media (max-width: 700px) {
        font-size: 12px;
    }
    @media (max-width: 500px) {
        font-size: 11px;
    }
`
