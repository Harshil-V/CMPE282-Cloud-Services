/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Input, Text, Image, Container, Spacer, Button } from '@chakra-ui/react';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);
    const inputFileRef = useRef(null); // Ref for the hidden file input
    // const [images, setImages] = useState([
    //     // Mock data for images
    //     { id: 1, url: 'https://via.placeholder.com/150', name: 'Sunset' },
    //     { id: 2, url: 'https://via.placeholder.com/150', name: 'Forest' },
    //     { id: 3, url: 'https://via.placeholder.com/150', name: 'Mountains' },
    //     { id: 4, url: 'https://via.placeholder.com/150', name: 'Cityscape' },
    //     { id: 5, url: 'https://via.placeholder.com/150', name: 'Ocean' },
    //     // Add more images or replace URLs with real ones as needed
    // ]);

    const [images, setImages] = useState([
        {
            id: 1,
            categories: ["nature", "landscape", "flower"],
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg"
        },
        {
            id: 2,
            categories: ["city"],
            image: "https://worldstrides.com/wp-content/uploads/2015/07/iStock_000040849990_Large.jpg"
        },
        {
            id: 3,
            categories: ["space"],
            image: "https://webb.nasa.gov/content/webbLaunch/assets/images/images2023/oct-30-23-STScI-01HBBMJ8R6HTXP5W1EVEJ24D64-1K.jpg"
        },
        {
            id: 4,
            categories: ["nature", "landscape"],
            image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg"
        },
        {
            id: 5,
            categories: ["city"],
            image: "https://st.depositphotos.com/1035350/2277/i/450/depositphotos_22772802-stock-photo-tokyo-cityscape.jpg"
        },
        {
            id: 6,
            categories: ["space"],
            image: "https://www.sciencenews.org/wp-content/uploads/2022/11/Hubble-Pillars-of-Creation.jpg"
        }
        // Add more images as per your JSON data
    ]);


    useEffect(() => {
        const filtered = images.filter(image =>
            image.categories.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredImages(filtered);
    }, [searchTerm, images]);

    const handleFileInputChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            // Process the selected file here
            // For example, you might want to add the new image to your images state or upload it to a server
            console.log("File selected:", files[0]);
        }
    };

    // Function to trigger the file input when the upload button is clicked
    const handleUploadClick = () => {
        inputFileRef.current.click();
    };

    return (
        <>
            <Box bg="teal.400" color="white" p={4} w="full">
                <Flex p={4} alignItems="center">
                    <Button colorScheme="teal">Home</Button>
                    <Button colorScheme="teal" ml={4}>Profile</Button>
                    <Button colorScheme="teal" ml={4}>Settings</Button>
                    <Spacer />
                    <Button colorScheme="red" variant="solid">Log out</Button>
                </Flex>
            </Box>
            <Flex direction="column" align="center" maxW={{ xl: "1100px" }} m="0 auto">
                {/* <Box p={4} w="full" mb={6}>
                    <Input
                        placeholder="Search images by categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box> */}
                <Flex p={4} w="full" alignItems="center" mb={6}>
                    <Input
                        placeholder="Search images by categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        mr={4}
                    />
                    <Button onClick={handleUploadClick} colorScheme="blue">Upload</Button>
                    <input
                        type="file"
                        ref={inputFileRef}
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }} // Hide the file input
                        accept="image/*" // Accept images only
                    />
                </Flex>
                <Flex wrap="wrap" justifyContent="left" gap={6}>
                    {filteredImages.map((image) => (
                        <Box key={image.id} p={2} boxShadow="2xl" borderRadius="lg" _hover={{ boxShadow: "3xl" }} width="200px">
                            <Image src={image.image} alt="image" boxSize="200px" objectFit="cover" borderRadius="md" />
                            <Flex wrap="wrap" justify="center" mt={2}>
                                {image.categories.map((category, index) => (
                                    <Text key={index} fontSize="xs" p={1} bg="gray.200" borderRadius="md" mx={1} my={1}>
                                        {category}
                                    </Text>
                                ))}
                            </Flex>
                        </Box>
                    ))}
                </Flex>
            </Flex>
        </>
    );
};

export default Dashboard;
