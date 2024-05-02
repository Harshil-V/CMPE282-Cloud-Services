import { useEffect, useState } from "react";
import { Box, Flex, Button, Spacer, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { fetchUserAttributes, signOut } from "aws-amplify/auth";
import { HamburgerIcon } from "@chakra-ui/icons";

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

  const menuButtonVariant = useBreakpointValue({
    base: "menu", // For small screens, use a menu
    md: "button", // For medium screens and up, use buttons
  });

  return (
    <Box bg="teal.400" color="white" p={4} w="full">
      <Flex p={4} alignItems="center" flexWrap="wrap">
        {menuButtonVariant === "menu" ? (
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} colorScheme="teal" />
            <MenuList bg="white" color="black">
              <MenuItem as={Link} to="/">Home</MenuItem>
              <MenuItem as={Link} to="/translate">Translate</MenuItem>
              <MenuItem as={Link} to="/textract">Textract</MenuItem>
              <MenuItem onClick={handleSignOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button colorScheme="teal">Home</Button>
            </Link>
            <Link to="/translate" style={{ textDecoration: "none", marginLeft: 16 }}>
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
            <Button colorScheme="red" variant="solid" onClick={() => handleSignOut()}>
              Log out
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
