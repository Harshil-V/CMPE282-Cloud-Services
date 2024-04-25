import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 

const Navbar = () => {
    return (
        <Box bg="teal.400" color="white" p={4} w="full">
            <Flex p={4} alignItems="center" flexWrap="wrap">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button colorScheme="teal">Home</Button>
                </Link>
                <Link to="/translate" style={{ textDecoration: 'none', marginLeft: 16 }}>
                    <Button colorScheme="teal">Translate</Button>
                </Link>
                <Link to="/textract" style={{ textDecoration: 'none', marginLeft: 16 }}>
                    <Button colorScheme="teal">Textract</Button>
                </Link>
                <Spacer />
                <Button colorScheme="red" variant="solid">Log out</Button>
            </Flex>
        </Box>
    );
};

export default Navbar;
