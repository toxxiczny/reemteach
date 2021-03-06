import styled, { css } from 'styled-components/macro'

export default styled.section`
    width: 100%;
    padding: 50px 30px;
    transition: width 0.7s ease-in-out, margin-left 0.7s ease-in-out, padding 0.7s ease-in-out;
    @media (max-width: 850px) {
        padding: 126.4px 30px 50px 30px;
    }
    @media (max-width: 500px) {
        padding: 114.8px 30px 50px 30px;
    }
    ${({ withMenu }) => {
        if (withMenu)
            return css`
                width: calc(100% - 350px);
                margin-left: 350px;
                @media (max-width: 1000px) {
                    width: calc(100% - 300px);
                    margin-left: 300px;
                }
                @media (max-width: 850px) {
                    padding: 50px 30px;
                }
                @media (max-width: 800px) {
                    width: calc(100% - 250px);
                    margin-left: 250px;
                }
                @media (max-width: 600px) {
                    width: calc(100% - 200px);
                    margin-left: 200px;
                }
                @media (max-width: 500px) {
                    width: 100%;
                    padding: 114.8px 20px 50px 20px;
                    margin-left: 0px;
                }
            `
    }}
`
