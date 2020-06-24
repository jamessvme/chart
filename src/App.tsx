import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';
import Chat from 'screens/chat';
import Home from 'screens/home';
import FindRoom from 'screens/find_room';
import AppLayout from 'components/AppLayout';
import ProtectedRoute from 'routers/ProtectedRoute';
import PublicRoute from 'routers/PublicRoute';

const App: React.FC = () => (
    <BrowserRouter>
        <AppLayout>
            <Switch>
                <PublicRoute path="/" exact component={Home} />
                <ProtectedRoute path="/chat" exact component={Chat} />
                <ProtectedRoute path="/room" exact component={FindRoom} />
                <PublicRoute path="/signin" exact component={SignIn} />
                <PublicRoute path="/signup" exact component={SignUp} />
            </Switch>
        </AppLayout>
    </BrowserRouter>
);

export default App;
