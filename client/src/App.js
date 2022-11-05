import { Route, Routes } from 'react-router-dom'

import Profile from './pages/Profile'

import { createTheme, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./components/NavBar";
import Home from "./pages/Home";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Login, Signup } from './pages/LoginSignup';
import CreateAgent from './pages/CreateAgent';
import CreateTag from './pages/CreateTag';
import Agent from './pages/Agent'



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
                main: '#002984',
            },
            secondary: {
                main: '#ff7961'
            }
        }
    })
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
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
                        path="/profile"
                        element={<Profile />}
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
                        path="/agent/*"
                        element={<Agent />}
                    />
                </Routes>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;
