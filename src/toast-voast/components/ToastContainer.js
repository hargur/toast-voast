// Importing npm modules
import React, { useState, useEffect } from 'react';
import {Link,
  withRouter
} from "react-router-dom";
import PropTypes from 'prop-types';

// Components
import { toastConfig } from './ToastConsumer';
import { StyledAnchor, StyledButton, StyledDiv, StyledInnerDiv, StyledPara } from './styledElements';

// Importing styling
import '../style.css';
import { IMAGE_ALT_TEXT } from '../toast.constants';

const ToastContainer = props => {
    const {
        history,
        message,
        index,
        options: {
            textColor,
            position,
            height,
            bgColor,
            padding,
            type,
            totalHeight,
            textAlignment,
            closeButtonImageSrc,
            actionHref,
            actionPrefetch,
            onClickAction,
            actionLinkAs,
            hideOnRouteChange,
            innerChildren,
            timeout,
            id
        }
    } = props;

    const [animateIn, setAnimateIn] = useState(true);

    useEffect(() => {
        // To close automatically if timeout given
        timeout &&
            setTimeout(() => {
                setAnimateIn(false);
            }, timeout);

        history.listen(() => {
            hideOnRouteChange && setAnimateIn(false);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(
     () => {
        // Removing the element from main list of toasts
        if (!animateIn) {
            setTimeout(() => toastConfig.close(id), 500);
        }
      },
        // eslint-disable-next-line
        [animateIn]
    );

    return (
        <StyledDiv
            visible={animateIn}
            textColor={textColor}
            position={position}
            bgColor={bgColor}
            height={height}
            type={type}
            index={index}
            textAlignment={textAlignment}
            totalHeight={totalHeight}
            className={type}
        >
            {animateIn && (
                <img
                    src={closeButtonImageSrc}
                    width="11px"
                    height="11px"
                    alt={IMAGE_ALT_TEXT.CLOSE_TOAST_ICON}
                    title="close-toast"
                    className="close-button"
                    onClick={setAnimateIn.bind(this, false)}
                />
            )}
            {animateIn && !actionHref && !onClickAction && (
                <StyledInnerDiv padding={padding} textColor={textColor}>
                    {innerChildren ? innerChildren : <StyledPara>{message}</StyledPara>}
                </StyledInnerDiv>
            )}
            {actionHref ? (
                <Link prefetch={actionPrefetch} href={actionHref} as={actionLinkAs}>
                    <StyledAnchor padding={padding} textColor={textColor} title={actionHref}>
                        {animateIn && (innerChildren ? innerChildren : <StyledPara>{message}</StyledPara>)}
                    </StyledAnchor>
                </Link>
            ) : (
                onClickAction && (
                    <StyledButton
                        title={`notification-${type}`}
                        onClick={onClickAction}
                        padding={padding}
                        textColor={textColor}
                    >
                        {animateIn && (innerChildren ? innerChildren : <StyledPara>{message}</StyledPara>)}
                    </StyledButton>
                )
            )}
        </StyledDiv>
    );
};

ToastContainer.propTypes = {
    message: PropTypes.string,
    options: PropTypes.shape({
        textColor: PropTypes.string,
        position: PropTypes.string,
        height: PropTypes.number,
        bgColor: PropTypes.string,
        padding: PropTypes.number,
        type: PropTypes.string,
        totalHeight: PropTypes.number,
        textAlignment: PropTypes.string,
        closeButtonImageSrc: PropTypes.string,
        actionHref: PropTypes.string,
        actionPrefetch: PropTypes.bool,
        onClickAction: PropTypes.func,
        actionLinkAs: PropTypes.string,
        hideOnRouteChange: PropTypes.bool,
        innerChildren: PropTypes.string,
        timeout: PropTypes.number,
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }),
    index: PropTypes.number
};

export default withRouter(ToastContainer);
