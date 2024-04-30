import { useEffect, useState } from "react";
import { Box, Flex, Button, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { fetchUserAttributes } from "aws-amplify/auth";
import { signOut } from "aws-amplify/auth";

const Navbar = () => {
  const [authUser, setAuthUser] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log(userAttributes);
      setAuthUser(userAttributes.email);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleFetchUserAttributes();
  }, []);

  return (
    <Box bg="teal.400" color="white" p={4} w="full">
      <Flex p={4} alignItems="center" flexWrap="wrap">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button colorScheme="teal">Home</Button>
        </Link>
        <Link
          to="/translate"
          style={{ textDecoration: "none", marginLeft: 16 }}
        >
          <Button colorScheme="teal">Translate</Button>
        </Link>
        <Link to="/textract" style={{ textDecoration: "none", marginLeft: 16 }}>
          <Button colorScheme="teal">Textract</Button>
        </Link>
        <Spacer />
        {loading ? (
                    <Text marginRight={10}>Loading...</Text> 
                ) : (
                    authUser && <Text marginRight={10}>Hello, {authUser}</Text> 
                )}
        <Button colorScheme="red" variant="solid" onClick={()=> handleSignOut()}>
          Log out
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
