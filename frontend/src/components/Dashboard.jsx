/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Text, Image, Container, Spacer, Button } from '@chakra-ui/react';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);
    const [images, setImages] = useState([
        // Mock data for images
        { id: 1, url: 'https://via.placeholder.com/150', name: 'Sunset' },
        { id: 2, url: 'https://via.placeholder.com/150', name: 'Forest' },
        { id: 3, url: 'https://via.placeholder.com/150', name: 'Mountains' },
        { id: 4, url: 'https://via.placeholder.com/150', name: 'Cityscape' },
        { id: 5, url: 'https://via.placeholder.com/150', name: 'Ocean' },
        // Add more images or replace URLs with real ones as needed
    ]);

    useEffect(() => {
        // Filter images based on the searchTerm. Adjust the property you wish to filter by (e.g., name).
        const filtered = images.filter(image =>
            image.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredImages(filtered);
    }, [searchTerm, images]);

    return (
        <>
            <Box bg="teal.400" color="white" p={4} w="full">
                <Flex p={4} alignItems="center">
                    <Button colorScheme="teal" >Home</Button>
                    <Button colorScheme="teal" ml={4}>Profile</Button>
                    <Button colorScheme="teal" ml={4}>Settings</Button>
                    <Spacer />
                    <Button colorScheme="red" variant="solid">Log out</Button>
                </Flex>
            </Box>
            <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
                <Box p={4} w="full" mb={6}>
                    <Input
                        placeholder="Search images by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <Flex wrap="wrap" justifyContent="center" gap={6}> {/* Increased spacing between images */}
                    {filteredImages.map((image) => (
                        <Box key={image.id} p={2} boxShadow="2xl" borderRadius="lg" _hover={{ boxShadow: "3xl" }}> {/* Enhanced drop shadow */}
                            <Image src={image.url} alt={image.name} boxSize="150px" objectFit="cover" borderRadius="md" />
                            <Text mt={2} fontSize="sm" textAlign="center">{image.name}</Text>
                        </Box>
                    ))}
                </Flex>
            </Flex>
        </>
    );
};

export default Dashboard;
