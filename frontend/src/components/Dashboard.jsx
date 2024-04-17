/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Input, Text, Image, Button, Spacer, Grid, useBreakpointValue, useToast, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Dashboard = () => {
    const imagesPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredImages, setFilteredImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const inputFileRef = useRef(null);
    const toast = useToast();

    const [images, setImages] = useState([
        {
            "id": 1,
            "categories": ["nature", "landscape", "flower", "78"],
            "image": "https://example.com/stock-image-nature-mountain-flowers-1.jpg"
        },
        {
            "id": 2,
            "categories": ["city","flower"],
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
        setFilteredImages(filtered.slice(0, imagesPerPage));
        setTotalPages(Math.ceil(filtered.length / imagesPerPage));
    }, [searchTerm, images]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        const startIndex = (page - 1) * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        setFilteredImages(images.slice(startIndex, endIndex));
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // Simulate file upload
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a file upload process
                toast({
                    title: "Upload successful",
                    description: "Your image has been uploaded successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                // Update your images state here with the new image data
            } catch (error) {
                toast({
                    title: "Upload failed",
                    description: "There was a problem uploading your image.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };

    const handleUploadClick = () => {
        inputFileRef.current.click();
    };

    const handleDeleteImage = (id) => {
        const updatedImages = images.filter(image => image.id !== id);
        setImages(updatedImages);
        handlePageClick(Math.max(1, Math.min(currentPage, Math.ceil(updatedImages.length / imagesPerPage))));
        toast({
            title: "Image deleted",
            description: "The image has been successfully deleted.",
            status: "info",
            duration: 5000,
            isClosable: true,
        });
    };

    const gridTemplateColumns = useBreakpointValue({
        base: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)"
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
                        <Box key={image.id} p={2} boxShadow="2xl" borderRadius="lg" _hover={{ boxShadow: "3xl" }}
                            display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Image src={image.image} alt={`Image ${image.id}`} boxSize="180px" objectFit="cover" borderRadius="md" mb={2} />
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
                                    mt={2}
                                />
                            </Flex>
                        </Box>
                    ))}
                </Grid>
                <Flex mt="8" justify="center">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => handlePageClick(i + 1)}
                            mx={1}
                            colorScheme={currentPage === i + 1 ? "teal" : "gray"}>
                            {i + 1}
                        </Button>
                    ))}
                </Flex>
            </Flex>
        </>
    );
};

export default Dashboard;
