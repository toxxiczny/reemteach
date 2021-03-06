import styled from 'styled-components/macro'

export default styled.div`
    width: 100%;
    margin-bottom: ${({ withoutError }) => (withoutError ? 0 : 30)}px;
    display: flex;
    justify-content: center;
    align-items: center;
`
