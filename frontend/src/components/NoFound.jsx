import { Button, Center, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Center height="100vh">
            <div>
                <Heading size="xl" mb={4}>
                    404 - Page Not Found
                </Heading>
                <center>
                    <Button colorScheme="blue" as={Link} to="/">
                        Go to Home
                    </Button>
                </center>
            </div>
        </Center>
    );
};

export default NotFoundPage;
