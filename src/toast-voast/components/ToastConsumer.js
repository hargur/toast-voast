// Importing constants
import { TYPES, TYPE_TEXT_COLOR, TOAST_PROPERTIES } from '../toast.constants';
// Importing npm modules
import React, { useContext } from 'react';
import { ThemeProvider } from '../index';
import ToastContainer from './ToastContainer';

const toastConfig = {};

const ToastConsumer = parentProps => {
    const context = useContext(ThemeProvider);
    const mapOverTypes = type =>
        (toastConfig[type] = (message, options = {}) => {
            options.type = type;
            options.id = options.id || Math.floor(Math.random() * 10000);
            options.bgColor = options.bgColor || (type === 'default' ? parentProps.bgColor : TYPE_TEXT_COLOR[type]);

        
            TOAST_PROPERTIES.forEach(
                optionValue => (options[optionValue] = options[optionValue] || parentProps[optionValue])
            );
            const obj = context.state.toastElements;

            // Total calculative height from where the toast should appear
            options.totalHeight =
                obj.length > 0
                    ?
                    obj.reduce(
                        (total, toast) =>
                            total +
                              7 +
                              (toast.options.height > 2 * toast.options.padding
                                  ? toast.options.height
                                  : 2 * toast.options.padding),
                        0
                    )
                    : 0;

            // Checking whether the id exists or not and appending accordingly
            const idExistsAlready =
                obj.length > 0
                    ?
                    obj.reduce((exists, toast) => (exists || toast.options.id === options.id ? true : false), false)
                    : false;

            if (!idExistsAlready) {
                obj.push({ message, options });
                context.setValues(obj);
            }
        });

    /* Maintaining functions for calling toastConfig */

    TYPES.map(mapOverTypes);

    // Closing all the toasts present
    toastConfig.closeAll = () => context.setValues([]);

    /* Closing a particular toast with the Id mentoned ; If id isn't present then nothing happens */
    toastConfig.close = id => {
        if (typeof id === 'number' || typeof id === 'string') {
        
            const mapForIdSearch = context.state.toastElements.map(toast => toast.options.id);
            const indexForId = mapForIdSearch.indexOf(id);

            if (indexForId > -1) {
                const { height, padding } = context.state.toastElements[indexForId].options;

                // Closing with particular id
            
                let obj = context.state.toastElements.map((toast, index) => {
                    // To shift up/down while the other toasts are deleted
                    if (index > indexForId) {
                        toast.options.totalHeight =
                            toast.options.totalHeight - 7 - (height > 2 * padding ? height : 2 * padding);
                    }
                    return toast;
                });
            
                obj = obj.filter(item => item.options.id !== id);
                context.setValues(obj);
            }
        }
    };

    return (
        <ThemeProvider.Consumer>
            {context =>
                context.state.toastElements &&
            
                context.state.toastElements.map((toast, index) => (
                    <ToastContainer
                        message={toast.message}
                        options={toast.options}
                        index={index}
                        key={toast.options.id}
                    />
                ))
            }
        </ThemeProvider.Consumer>
    );
};

export default ToastConsumer;
export { toastConfig };
