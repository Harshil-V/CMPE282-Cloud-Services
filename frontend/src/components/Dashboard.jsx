/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Input, Text, Image, Button, Spacer, Grid, useBreakpointValue, useToast, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);
    const inputFileRef = useRef(null);
    const toast = useToast();

    // const [images, setImages] = useState([
    //     // Mock data for images
    //     { id: 1, url: 'https://via.placeholder.com/150', name: 'Sunset' },
    //     { id: 2, url: 'https://via.placeholder.com/150', name: 'Forest' },
    //     { id: 3, url: 'https://via.placeholder.com/150', name: 'Mountains' },
    //     { id: 4, url: 'https://via.placeholder.com/150', name: 'Cityscape' },
    //     { id: 5, url: 'https://via.placeholder.com/150', name: 'Ocean' },
    //     // Add more images or replace URLs with real ones as needed
    // ]);
    // const [images, setImages] = useState([
    //     {
    //         "id": 1,
    //         "categories": ["nature", "landscape", "flower", "hwhuksbefg"],
    //         "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg"
    //     },
    //     {
    //         "id": 2,
    //         "categories": ["city"],
    //         "image": "https://worldstrides.com/wp-content/uploads/2015/07/iStock_000040849990_Large.jpg"
    //     },
    //     {
    //         "id": 3,
    //         "categories": ["space"],
    //         "image": "https://webb.nasa.gov/content/webbLaunch/assets/images/images2023/oct-30-23-STScI-01HBBMJ8R6HTXP5W1EVEJ24D64-1K.jpg"
    //     },
    //     {
    //         "id": 4,
    //         "categories": ["nature", "landscape"],
    //         "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg"
    //     },
    //     {
    //         "id": 5,
    //         "categories": ["city"],
    //         "image": "https://st.depositphotos.com/1035350/2277/i/450/depositphotos_22772802-stock-photo-tokyo-cityscape.jpg"
    //     },
    //     {
    //         "id": 6,
    //         "categories": ["space"],
    //         "image": "https://www.sciencenews.org/wp-content/uploads/2022/11/Hubble-Pillars-of-Creation.jpg"
    //     },
    //     {
    //         "id": 7,
    //         "categories": ["ocean", "nature"],
    //         "image": "https://upload.wikimedia.org/wikipedia/commons/5/59/Beautiful_ocean_sunset.jpg"
    //     },
    //     {
    //         "id": 8,
    //         "categories": ["forest", "nature"],
    //         "image": "https://cdn.pixabay.com/photo/2017/08/07/23/52/forest-2606799_960_720.jpg"
    //     },
    //     {
    //         "id": 9,
    //         "categories": ["historical", "city"],
    //         "image": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golconda_Fort_2.jpg"
    //     }
    // ]
    // );
    const [images, setImages] = useState([
        {
            "id": 1,
            "categories": ["nature", "landscape", "flower"],
            "image": "https://example.com/stock-image-nature-mountain-flowers-1.jpg"
        },
        {
            "id": 2,
            "categories": ["city"],
            "image": "https://example.com/stock-image-cityscape-1.jpg"
        },
        {
            "id": 3,
            "categories": ["space"],
            "image": "https://example.com/stock-image-space-1.jpg"
        },
        {
            "id": 4,
            "categories": ["nature", "landscape"],
            "image": "https://example.com/stock-image-nature-mountain-1.jpg"
        },
        {
            "id": 5,
            "categories": ["city"],
            "image": "https://example.com/stock-image-tokyo-cityscape-1.jpg"
        },
        {
            "id": 6,
            "categories": ["space"],
            "image": "https://example.com/stock-image-space-hubble-1.jpg"
        },
        {
            "id": 7,
            "categories": ["ocean", "nature"],
            "image": "https://example.com/stock-image-ocean-sunset-1.jpg"
        },
        {
            "id": 8,
            "categories": ["forest", "nature"],
            "image": "https://example.com/stock-image-forest-1.jpg"
        },
        {
            "id": 9,
            "categories": ["historical", "city"],
            "image": "https://example.com/stock-image-historical-city-1.jpg"
        },
        {
            "id": 10,
            "categories": ["animals", "wildlife"],
            "image": "https://example.com/stock-image-wildlife-1.jpg"
        },
        {
            "id": 11,
            "categories": ["technology", "future"],
            "image": "https://example.com/stock-image-technology-1.jpg"
        },
        {
            "id": 12,
            "categories": ["sports", "action"],
            "image": "https://example.com/stock-image-sports-action-1.jpg"
        },
        {
            "id": 13,
            "categories": ["music", "festival"],
            "image": "https://example.com/stock-image-music-festival-1.jpg"
        },
        {
            "id": 14,
            "categories": ["art", "painting"],
            "image": "https://example.com/stock-image-art-painting-1.jpg"
        },
        {
            "id": 15,
            "categories": ["winter", "snow"],
            "image": "https://example.com/stock-image-winter-snow-1.jpg"
        },
        {
            "id": 16,
            "categories": ["autumn", "leaves"],
            "image": "https://example.com/stock-image-autumn-leaves-1.jpg"
        },
        {
            "id": 17,
            "categories": ["spring", "blossoms"],
            "image": "https://example.com/stock-image-spring-blossoms-1.jpg"
        },
        {
            "id": 18,
            "categories": ["summer", "beach"],
            "image": "https://example.com/stock-image-summer-beach-1.jpg"
        },
        {
            "id": 19,
            "categories": ["mountains", "hiking"],
            "image": "https://example.com/stock-image-mountains-hiking-1.jpg"
        },
        {
            "id": 20,
            "categories": ["urban", "street art"],
            "image": "https://example.com/stock-image-urban-street-art-1.jpg"
        },
        {
            "id": 21,
            "categories": ["agriculture", "farming"],
            "image": "https://example.com/stock-image-agriculture-farming-1.jpg"
        },
        {
            "id": 22,
            "categories": ["desert", "landscape"],
            "image": "https://example.com/stock-image-desert-landscape-1.jpg"
        },
        {
            "id": 23,
            "categories": ["ocean", "marine life"],
            "image": "https://example.com/stock-image-ocean-marine-life-1.jpg"
        },
        {
            "id": 24,
            "categories": ["night", "city lights"],
            "image": "https://example.com/stock-image-night-city-lights-1.jpg"
        },
        {
            "id": 25,
            "categories": ["food", "cuisine"],
            "image": "https://example.com/stock-image-food-cuisine-1.jpg"
        },
        {
            "id": 26,
            "categories": ["architecture", "modern"],
            "image": "https://example.com/stock-image-modern-architecture-1.jpg"
        },
        {
            "id": 27,
            "categories": ["people", "crowd"],
            "image": "https://example.com/stock-image-people-crowd-1.jpg"
        },
        {
            "id": 28,
            "categories": ["children", "play"],
            "image": "https://example.com/stock-image-children-play-1.jpg"
        },
        {
            "id": 29,
            "categories": ["vintage", "retro"],
            "image": "https://example.com/stock-image-vintage-retro-1.jpg"
        },
        {
            "id": 30,
            "categories": ["office", "work"],
            "image": "https://example.com/stock-image-office-work-1.jpg"
        }
    ]
    
    );


    useEffect(() => {
        const filtered = images.filter(image =>
            image.categories.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredImages(filtered);
    }, [searchTerm, images]);

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Example upload logic
            try {
                // Simulate an upload process
                // In a real application, this part would involve uploading the file to a server
                await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload delay

                toast({
                    title: "Upload successful.",
                    description: "Your image has been uploaded successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });

                // Update your images state here with the new image data
            } catch (error) {
                toast({
                    title: "Upload failed.",
                    description: "There was a problem uploading your image.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    // Function to trigger the file input when the upload button is clicked
    const handleUploadClick = () => {
        inputFileRef.current.click();
    };

    const handleDeleteImage = (id) => {
        setImages(images.filter(image => image.id !== id));
        toast({
            title: "Image deleted.",
            description: "The image has been successfully deleted.",
            status: "info",
            duration: 5000,
            isClosable: true,
        });
    };

    const gridTemplateColumns = useBreakpointValue({
        base: "repeat(2, 1fr)", // 2 columns on base/mobile screens
        md: "repeat(3, 1fr)", // 3 columns on medium screens and up
        lg: "repeat(4, 1fr)", // 4 columns on large screens
        xl: "repeat(5, 1fr)", // 5 columns on extra large screens
    });

    return (
        <>
            <Box bg="teal.400" color="white" p={4} w="full">
                <Flex p={4} alignItems="center" flexWrap="wrap">
                    <Button colorScheme="teal">Home</Button>
                    <Button colorScheme="teal" ml={4}>Profile</Button>
                    <Button colorScheme="teal" ml={4}>Settings</Button>
                    <Spacer />
                    <Button colorScheme="red" variant="solid">Log out</Button>
                </Flex>
            </Box>
            <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto" px={[4, 8, 12]}>
                <Flex w="full" alignItems="center" justifyContent="space-between" mb={6} mt={[4, 6, 8]} flexWrap="wrap">
                    <Input
                        placeholder="Search images by categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        flex="1"
                        mr={4}
                    />
                    <Button onClick={handleUploadClick} colorScheme="blue">Upload</Button>
                    <input
                        type="file"
                        ref={inputFileRef}
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </Flex>
                <Grid templateColumns={gridTemplateColumns} gap={6} w="full">
                    {filteredImages.map((image) => (
                        <Box key={image.id} p={2} boxShadow="2xl" borderRadius="lg" _hover={{ boxShadow: "3xl" }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Image src={image.image} alt={image.name} boxSize="180px" objectFit="cover" borderRadius="md" mb={2} /> {/* Added mb={2} here */}
                            <Flex justify="center" w="full" overflowX="auto" px={2}>
                                {image.categories.slice(0, 3).map((category, index) => (
                                    <Text key={index} fontSize="xs" p={1} bg="gray.200" borderRadius="md" mx={1} my={1} whiteSpace="nowrap">
                                        {category}
                                    </Text>
                                ))}
                            </Flex>
                            <Flex justify="flex-end" w="full" px={2}>
                                <IconButton
                                    aria-label="Delete image"
                                    icon={<DeleteIcon />}
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => handleDeleteImage(image.id)}
                                    mt={2} // Ensure spacing if needed
                                />
                            </Flex>
                        </Box>
                    ))}
                </Grid>
                {/* <Grid templateColumns={gridTemplateColumns} gap={6} w="full">
                    {filteredImages.map((image) => (
                        <Box key={image.id} p={2} boxShadow="2xl" borderRadius="lg" _hover={{ boxShadow: "3xl" }} position="relative" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Image src={image.image} alt={image.name} boxSize="200px" objectFit="cover" borderRadius="md" />
                            <Flex justify="space-between" align="center" w="full" mt={2} px={2}>
                                <Flex overflowX="auto" wrap="nowrap">
                                    {image.categories.slice(0, 3).map((category, index) => (
                                        <Text key={index} fontSize="xs" p={1} bg="gray.200" borderRadius="md" mx={1} my={1} whiteSpace="nowrap">
                                            {category}
                                        </Text>
                                    ))}
                                </Flex>
                                <IconButton
                                    aria-label="Delete image"
                                    icon={<DeleteIcon />}
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => handleDeleteImage(image.id)}
                                />
                            </Flex>
                        </Box>
                    ))}
                </Grid> */}
            </Flex>
        </>
    );
};

export default Dashboard;
