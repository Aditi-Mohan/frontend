import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export const ReactStyledTooltip = styled(ReactTooltip).attrs({
    className: "type-dark",
})`
&.type-dark div{
    white-space: nowrap;
    display: inline-block;
    font-size: 14px;
    font-weight: 300;
    font-family: Cambria;
    color: #fae19b;
    letter-spacing: 0.1rem;
}
`;