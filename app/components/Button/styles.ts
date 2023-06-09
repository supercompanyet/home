import styled, { css } from 'styled-components';
import { ButtonStyleType } from '@customTypes/ButtonStyleType';


const filledButton = css`
    background: var(--red2);
    border: none;
    color: var(--white);
`;

const outlinedButton = css`
    background: none;
    border: .1rem solid var(--red2);
    color: var(--red2);
`;

export const Button = styled.button<{ buttonStyleType?: ButtonStyleType }>`
    padding: .5rem 1.2rem;
    border-radius: .5rem;
    cursor: pointer;
    transition: all ease .2s;

    &:hover {
        filter: brightness(90%);
    }

    ${props => {
        switch (props.buttonStyleType) {
            case ButtonStyleType.OUTLINED:
                return outlinedButton;
            case ButtonStyleType.FILLED:
                return filledButton;
            default:
                return filledButton;
        }
    }
    }
`;