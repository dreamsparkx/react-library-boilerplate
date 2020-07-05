import React from 'react';
import { storiesOf } from '@storybook/react';
import Example from './index';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

storiesOf('Example', module)
    .addDecorator(withKnobs)
    .add('default', () => <Example text={text('text', 'Example Text')} onClick={action('clicked')} />)
    .add('secondary', () => (
        <Example text={select('text', { first: 'first', second: 'second' }, 'first')} onClick={action('clicked')} />
    ));
