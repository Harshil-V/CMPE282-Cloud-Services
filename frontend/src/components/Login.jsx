import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Center, Container, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// import { Auth } from 'aws-amplify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const signIn = async () => {
        if (!username || !password) {
            toast({
                title: "Missing fields",
                description: "Please enter both username and password.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }

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
                    width="400px" 
                    maxW="md"
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
                    <Button mt={4} colorScheme="teal" onClick={signIn} width="full">
                        Log in
                    </Button>
                    <Button as={Link} to="/register" mt={4} colorScheme="blue" width="full">
                        Register
                    </Button>
                </Box>
            </Center>
        </Container>
    );
};

export default Login;
