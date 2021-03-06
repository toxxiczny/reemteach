import styled from 'styled-components/macro'

export default styled.p`
    text-align: left;
    margin-top: 8px;
    font-weight: 600;
    color: red;
    text-transform: initial;
    font-size: 11px;
    @media (max-width: 700px) {
        font-size: 10px;
    }
    @media (max-width: 600px) {
        font-size: 9px;
    }
`
