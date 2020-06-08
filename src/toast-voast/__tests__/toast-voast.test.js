import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';

import toJson from 'enzyme-to-json';
//Tested component.
import Toast from '../index';
import ToastContainer from '../components/ToastContainer';
import { toastConfig } from '../components/ToastConsumer';
import { BrowserRouter } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('Testing Main Toast Components', () => {
    it('Toast should render correctly with no props', () => {
        const component = shallow(<Toast isTestEnv />);
        expect(toJson(component)).toMatchSnapshot();
    });

    it('Toast container should render correctly', () => {
        const component = shallow(<ToastContainer message="error" options={{ textColor: '#fff' }} index="1" />);
        expect(toJson(component)).toMatchSnapshot();
    });
});

describe('Testing Different Toast Scenarios', () => {
    it('Testing toast props', async () => {
        const push = jest.fn();
        const component = mount(<BrowserRouter><Toast isTestEnv /></BrowserRouter>);
        component.setProps({ history: { push } });
        toastConfig.success('Success Case', { bgColor: '#000' });
        component.update();
        expect(getComputedStyle(component.find('div.success').getDOMNode()).getPropertyValue('background')).toBe('rgb(0, 0, 0)');
    });

    it('Testing whether toast is displayed', () => {
        const push = jest.fn();
        const component = mount(<BrowserRouter><Toast isTestEnv /></BrowserRouter>);
        component.setProps({ history: { push } });
        toastConfig.success('Success Case');
        component.update();
        expect(component.find('div.success').length).toBe(1);
    });

    it('Testing close all', () => {
        const push = jest.fn();
        const component = mount(<BrowserRouter><Toast isTestEnv /></BrowserRouter>);
        component.setProps({ history: { push } });
        toastConfig.error('Something went wrong');
        toastConfig.success('Success Case');
        toastConfig.info('Info');
        toastConfig.closeAll();
        component.update();
        expect(
            component.find('div.error').length &&
                component.find('div.success').length &&
                component.find('div.info').length
        ).toBe(0);
    });

    it('Testing close button with Timeout', () => {
        const push = jest.fn();
        const component = mount(<BrowserRouter><Toast isTestEnv timeout={3000} /></BrowserRouter>);
        component.setProps({ history: { push } });
        toastConfig.error('Something went wrong');
        toastConfig.success('Success Case');
        component.update();
        component.find('div.error img.close-button').simulate('click');
        component.update();
        setTimeout(() => {
            expect(component.find('div.error').length).toBe(0);
        }, 3000);
    });

    it('Testing closing with id', () => {
        const push = jest.fn();
        const component = mount(<BrowserRouter><Toast isTestEnv timeout={3000} /></BrowserRouter>);
        component.setProps({ history: { push } });
        toastConfig.error('Something went wrong', { id: '123' });
        toastConfig.success('Success Case');
        toastConfig.info('Info');
        toastConfig.close('123');
        component.update();
        setTimeout(() => {
            expect(component.find('div.error').length).toBe(0);
        }, 3000);
    });
});

