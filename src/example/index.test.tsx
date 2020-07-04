import React from "react";
import { render } from "@testing-library/react";

import TestComponent from "./index";
import { IProps } from "./index.types";


describe('Test Component', () => {
    let props: IProps;
    beforeEach(() => {
        props = {
            text: 'test'
        };
    });
    const renderComponent = () => render(<TestComponent {...props}/>);
    it('check', () => {
        const { getByTestId } = renderComponent();
        const testComponent = getByTestId('test-component');
        expect(testComponent).toHaveTextContent(props.text);
    });
});