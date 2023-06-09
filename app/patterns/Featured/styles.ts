import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 4rem;
    
    a {
        width: 100%;
    }

    .title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h2 {
            font-weight: 500;
            font-size: 2rem;
        }

        a {
            width: auto;
            border: 1px solid #0005;
            text-decoration: none;
            color: var(--black);
            padding: .3rem 1.5rem;
            background: var(--white);
            transition: all ease .2s;

            &:hover {
                filter: brightness(80%);
            }
        }
    }

    .cards-wrapper {
        width: 100%;
        overflow-x: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .cards-container {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
        
        @media (max-width: 970px) {
            a:nth-last-child(1) {
                display: none;
            }
        }
    }
`;