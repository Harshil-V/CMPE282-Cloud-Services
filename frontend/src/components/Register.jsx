import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Container, Center } from '@chakra-ui/react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, email, password, confirmPassword);
    };

    return (
        <Container centerContent>
            <Center w="100%" h="100vh">
                <Box 
                    my={8} 
                    textAlign="left" 
                    width="full" 
                    maxW="md"
                    p={8}
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg">
                    <form onSubmit={handleSubmit}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl id="email" isRequired mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password" isRequired mt={4}>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <FormControl id="confirmPassword" isRequired mt={4}>
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>
                        <Button width="full" mt={4} type="submit" colorScheme="teal">
                            Register
                        </Button>
                    </form>
                </Box>
            </Center>
        </Container >
    );
};

export default Register;
