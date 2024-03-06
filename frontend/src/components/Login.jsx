import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Center, Container } from '@chakra-ui/react';
// import { Auth } from 'aws-amplify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            // await Auth.signIn(username, password);
            alert('Logged in');
            // Redirect to another page or update state
        } catch (error) {
            console.error('Error signing in', error);
            alert('Error logging in');
        }
    };

    return (
        <Container centerContent>
            <Center w="100%" h="100vh">
                <Box
                    p={8}
                    maxWidth="800px"
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <FormControl id="email" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button mt={4} marginLeft={5} colorScheme="teal" onClick={signIn} isFullWidth>
                        Log in
                    </Button>
                    <Button mt={4} marginLeft={4} colorScheme="teal" onClick={signIn} isFullWidth>
                        Register
                    </Button>
                </Box>
            </Center>
        </Container>
    );
};

export default Login;
