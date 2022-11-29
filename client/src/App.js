import { Route, Routes, Navigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from "@mui/material";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Platform from "./pages/Platform";
import Landing from './pages/Landing'
import { Login, Signup } from './pages/LoginSignup';
import CreateAgent from './pages/adminportal/CreateAgent';
import CreateTag from './pages/adminportal/CreateTag';
import Agent from './pages/Agent';
import DeleteAgent from './pages/adminportal/DeleteAgent';
import DeleteTag from './pages/adminportal/DeleteTag';
import Admin from './pages/adminportal/Admin';
import EditAgent from './pages/adminportal/EditAgent';
import EditTag from './pages/adminportal/EditTag'
import Footer from './components/Footer';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#292929',
            },
            secondary: {
                main: '#D5AD6D'
            },
        },
        typography: {
            fontFamily: 'helvetica, Montserrat Semi Bold, arial',
        },
    })
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route
                        path="/"
                        element={<Platform />}
                    />
                    <Route
                        path="/landingpage"
                        element={<Landing />}
                    />

                    <Route
                        path="/signup"
                        element={<Signup />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/agent/*"
                        element={<Agent />}
                    />


                    {/* Admin portal */}
                    <Route
                        path="/admin"
                        element={<Admin />}
                    />  

                    <Route
                        path="/createAgent"
                        element={<CreateAgent />}
                    />

                    <Route
                        path="/createTag"
                        element={<CreateTag />}
                    />

                    <Route
                        path="/deleteAgent"
                        element={<DeleteAgent />}
                    />

                    <Route
                        path="/deleteTag"
                        element={<DeleteTag />}
                    />

                    <Route
                        path="/editAgent"
                        element={<EditAgent />}
                    />

                    <Route
                        path="/editTag"
                        element={<EditTag />}
                    />


                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
                <Footer />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
