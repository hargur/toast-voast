-   @description 
    Very simple React Toast library/module. Returns a list of Toasts being used on a particular page
-   @Pre-requisites: Modules like React, ReactDom, Router(react-router-dom with BrowserRouter , styled-components) and file for helper methods bing used globally from utils
-   Note: Needs to be mentioned at App level at once line eg: if you need to provide position 'bottomLeft' to all the children toasts then <Toast position='bottomLeft'/>
-   Whatever props will be passed to it will be default values for children
-   To call the Toast on any event use: toastConfig function and import it from
    import {toastConfig} from '../src/modules/toast-voast';
    usage: toastConfig("message")
    MESSAGE is mandatory to pass
    If need to pass some options( like position: 'bottonLeft') then: toastConfig("message",{options})

-   Every Toast item takes up a unique id, if you wish to pass a particular id then you may pass it with the help of toastConfig function :
    toastConfig("message",{id: "myId"})
    ID can only be number or string

-   Props available are:
    message: The text to be passed in the toast (MANDATORY FOR toastConfig()),
    timeout: Default should be INDEFINITE i.e never fading (DEFAULT 0),
    If required, specify here until when to show the toast in number only (will be considered as milliseconds),
    textAlignment: For alignment of the text (DEFAULT 'center'),
    [VALUES ALLOWED - 'right', 'left','center','justify'],
    height: Height of the toast to be mentioned ( DEFAULT '30') (in numbers according to px ),
    padding: Padding for the toast to be mentiond ( DEFAULT '10') (in numbers according to px ) ,
    innerChildren: Children to be passed in the toast (SHOULD BE AND ELEMENT),
    position: Position of the toast to appear from ( DEFAULT 'topLeft')
    [VALUES ALLOWED- 'topLeft', 'topRight','bottomLeft','bottomRight'],
    textColor: Custom Text color that will override the default one ( DEFAULT '#ffffff')(SHOULD be passed as hexcode),
    bgColor: Custom background color that will override the default one ( DEFAULT '#333333') (SHOULD be passed as hexcode),
    hideOnRouteChange: Show/Hide on route change ( DEFAULT true),
    closeButtonImageSrc: Custom icon (if required) to be placed other than default,
    onClickAction: Action to take place onTouch/click,
    actionHref: If action is type navigation/Link, then href must contain the valid route/link to be navigated,
    actionPrefetch: If action is type navigation/Link, then prefetch value if required,
    actionLinkAs: If action is type navigation/Link, then 'as' value if required to mention the query value

-   If actionHref is passed, then the whole Toast will act as a <Link/>
-   If onClickButton is passed, then the whole Toast will act as a <Button/>
-   Otherwise it will act as normal <div> with passed message
-   If innerChildren is passed then message will not be displayed. If actionHref/onClickAction with innerChildren is passed, then you must specify event.stopPropagation if you have any action item inside innerChildren element
-   toastConfig.close(id) -- will close the particular toast containing the id if passed by the user, else nothing happens
-   ID provided must be UNIQUE.
    -   If passed similar ID, that Toast wouldn't be created on the same page
    -   If hideRouterOnChange: true, different pages can have same id because the portal used (parent of all toasts in the app) will delete the toast as you come out of that page
-   toastConfig.closeAll() -- will close all the toasts on the page
-   TYPES USED -
    default (with black background color),
    info (with blue background color),
    success (with green background color),
    error (with red background color),
    warn (with yellow background color)
-   toastConfig Types allowed are toastConfig.default(), toastConfig.info(), toastConfig.success(),toastConfig.error() toastConfig.warn()


- @Tests runs in enzyme 
