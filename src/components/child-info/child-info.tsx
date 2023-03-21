import React from 'react';

import './child-info.scss';

export const ChildInfo = () => {
    return (
        <div>
            <span className="child-info__name">Paspartu</span>
            <span className="child-info__age">47</span>
            <span className="child-info__class-name">5B</span>
            <span className="child-info__teacher">Fileas Fogg</span>
        </div>
    );
};
