// Importing npm modules
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import ToastConsumer, { toastConfig } from "./components/ToastConsumer";

export const ThemeProvider = React.createContext();

/**
 * ToastVoast Component
 *
 * @description Returns a list of Toasts being used on a particular page
 * Note: Needs to be mentioned at App level at once
 * Whatever props will be passed to it will be default values for children
 * toastConfig.close(id) -- will close the particular toast containing the id if passed by the user, else nothing happens
 * toastConfig.closeAll() -- will close all the toasts on the page
 * Types allowed are toastConfig.default(), toastConfig.info(), toastConfig.success(),toastConfig.error() toastConfig.warn()
 * @param [{Object}] props - React component props
 */

const ToastVoast = (props) => {
  const { isTestEnv } = props;
  const [toastElements, setToastElements] = useState([]);

  const portalRef = useRef(null);

  if (portalRef.current === null) {
    /*****create element portal *****/
    let portalElm = document.createElement("div");
    portalElm.setAttribute("id", "portal");
    document.body.append(portalElm);
    portalRef.current = portalElm;
  }

  const setValues = (contextValues) => {
    const contextValuesArrayReference = [...contextValues];
    setToastElements(contextValuesArrayReference);
  };

  /* Portal added to run the toast always outside main components/main app */
  return (
    <ThemeProvider.Provider
      value={{
        state: { toastElements },
        setValues,
      }}
    >
      {isTestEnv ? (
        <ToastConsumer {...props} />
      ) : (
        portalRef.current && ReactDOM.createPortal(<ToastConsumer {...props} />, portalRef.current)
      )}
    </ThemeProvider.Provider>
  );
};

/* Providing default values to the props such that if not passed, these can be used.
Also, {...props} can be easily used without destructuring */
ToastVoast.defaultProps = {
  position: "topLeft",
  height: 30,
  textAlignment: "center",
  padding: 10,
  textColor: "#ffffff",
  bgColor: "#333",
  actionPrefetch: true,
  closeButtonImageSrc: `images/close.svg`,
  timeout: 0,
  hideOnRouteChange: true,
};

ToastVoast.propTypes = {
  /* For alignment of the text */
  textAlignment: PropTypes.oneOf(["center", "left", "right", "justify"]),
  /* Height of the toast to be mentioned in numbers according to px */
  height: PropTypes.number,
  /* Padding for the toast to be mentiond in numbers according to px. Eg: 20 */
  padding: PropTypes.number,
  /* Children to be passed in the toast */
  innerChildren: PropTypes.element,
  /* The text to be passed in the toast */
  message: PropTypes.string,
  /* Position of the toast to appear from */
  position: PropTypes.oneOf([
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
  ]),
  /* The type of data depicted by toast*/
  type: PropTypes.oneOf(["default", "warning", "info", "error", "success"]),
  /* Custom Text color that will override the default one */
  textColor: PropTypes.string,
  /* Custom background color that will override the default one */
  bgColor: PropTypes.string,
  /* Show/Hide on route change */
  hideOnRouteChange: PropTypes.bool,
  /* Default should be INDEFINITE i.e never fading.
    If required, specify here until when to show the toast in number only (will be considered as milliseconds) */
  timeout: PropTypes.number,
  /* Custom icon (if required) to be placed other than default */
  closeButtonImageSrc: PropTypes.string,
  /* Action to take place onTouch/click */
  onClickAction: PropTypes.func,
  /* If action is type navigation/Link, then href must contain the valid route/link to be navigated */
  actionHref: PropTypes.string,
  /* If action is type navigation/Link, then prefetch value if required*/
  actionPrefetch: PropTypes.bool,
  isTestEnv: PropTypes.bool,
};

export default ToastVoast;
export { toastConfig };
