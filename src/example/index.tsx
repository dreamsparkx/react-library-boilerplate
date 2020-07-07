import React from 'react';
import styled from 'styled-components';
import { IProps } from './index.types';

const StyledDiv = styled.div`
    display: inline-block;
`;

export default function Example(props: IProps) {
    const { text = 'Example', ...extra } = props;
    return (
        <StyledDiv data-testid="test-component" {...extra}>
            {text}
        </StyledDiv>
    );
}
