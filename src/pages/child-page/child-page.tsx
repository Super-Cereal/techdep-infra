import React from 'react';

import { ChildInfo } from '../../components/child-info/child-info';

import './child-page.scss';

export const ChildPage = () => {
    // неиспользуемая переменная, eslint подсветит
    const x = 123;

    return (
        <>
            <div className="child-page__header">header</div>
            <ChildInfo />
            <div>footer</div>
        </>
    );
};
