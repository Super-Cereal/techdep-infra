import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ChildPage } from './child-page/child-page';

export const Pages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing">Nice landing</Route>
                <Route path="/child" Component={ChildPage} />

                <Route path="/*" Component={() => <Navigate to="/landing" />} />
            </Routes>
            {/*<ToastNotification />*/}
            {/*<Modal />*/}
        </BrowserRouter>
    );
};
