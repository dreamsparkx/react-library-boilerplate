import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Example from './index';
import { IProps } from './index.types';

export default {
    title: 'Example',
    component: Example,
    argTypes: { onClick: { action: 'clicked' } },
} as Meta;

const Template: Story<IProps> = (args) => <Example {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Example Text'
};
