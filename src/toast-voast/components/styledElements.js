// Importing npm modules
import styled, { keyframes } from 'styled-components';
// Importing constants
import { POSITION_DIMENSIONS } from '../toast.constants';
// Importing styling
import '../style.css';

const toastAnimation = keyframes`
from {
    width: 0px;
  }

  to {
    width: 100%;
  }`;

/* A function to pass the correct values of top, bottom, left, right position based on prop value  position */
const checkPositionValue = (position, totalHeight) =>
    typeof position !== 'undefined'
        ? typeof totalHeight !== 'undefined'
            ? `${position + totalHeight}px`
            : `${position}px`
        : 'auto';

/* Styling main div for the toast */
export const StyledDiv = styled.div`
    color: ${props => props.textColor};
    text-align: ${props => props.textAlignment};
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 14px;
    box-sizing: border-box;
    font-size: 11px;
    background: ${props => props.bgColor};
    position: fixed;
    width: ${props => (props.visible && '100%') || 0};
    overflow: hidden;
    min-height: ${props => `${props.height}px`};
    top: ${props => checkPositionValue(POSITION_DIMENSIONS[props.position].top, props.totalHeight)};
    left: ${props => checkPositionValue(POSITION_DIMENSIONS[props.position].left)};
    right: ${props => checkPositionValue(POSITION_DIMENSIONS[props.position].right)};
    bottom: ${props => checkPositionValue(POSITION_DIMENSIONS[props.position].bottom, props.totalHeight)};
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
    border-radius: 2px;
    transition: all 0.5s;
    z-index: 999;
    -webkit-animation-name: ${toastAnimation}; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 0.3s;
    -webkit-animation-iteration-count: 1;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-name: ${toastAnimation};
`;

/* Styling buttons for the toast */
export const StyledButton = styled.button`
    background: none;
    padding: ${props => `${props.padding}px 27px ${props.padding}px ${props.padding}px`};
    border: none;
    outline: none;
    color: ${props => props.textColor};
    width: 100%;
`;

/* Styling anchors for link/navigation for the toast */
export const StyledAnchor = styled.a`
    display: block;
    color: ${props => props.textColor};
    text-decoration: none;
    padding: ${props => `${props.padding}px 27px ${props.padding}px ${props.padding}px`};
    width: 100%;
`;

/* Styling anchors for link/navigation for the toast */
export const StyledPara = styled.p`
    margin: 0
`;

/* Styling inner div when no links */
export const StyledInnerDiv = styled.div`
    color: ${props => props.textColor};
    padding: ${props => `${props.padding}px 27px ${props.padding}px ${props.padding}px`};
    width: 100%;
`;
