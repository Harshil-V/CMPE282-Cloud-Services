/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Input, Text, Image, Button, Spacer, Grid, useBreakpointValue, useToast, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Navbar from './NavBar';

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
            "image": "https://via.placeholder.com/180?text=Nature"
        },
        {
            "id": 2,
            "categories": ["city", "flower"],
            "image": "https://via.placeholder.com/180?text=Cityscape"
        },
        {
            "id": 3,
            "categories": ["space"],
            "image": "https://via.placeholder.com/180?text=Space"
        },
        {
            "id": 4,
            "categories": ["nature", "landscape"],
            "image": "https://via.placeholder.com/180?text=Mountain"
        },
        {
            "id": 5,
            "categories": ["city"],
            "image": "https://via.placeholder.com/180?text=Tokyo"
        },
        {
            "id": 6,
            "categories": ["space"],
            "image": "https://via.placeholder.com/180?text=Hubble"
        },
        {
            "id": 7,
            "categories": ["ocean", "nature"],
            "image": "https://via.placeholder.com/180?text=Ocean"
        },
        {
            "id": 8,
            "categories": ["forest", "nature"],
            "image": "https://via.placeholder.com/180?text=Forest"
        },
        {
            "id": 9,
            "categories": ["historical", "city"],
            "image": "https://via.placeholder.com/180?text=Historical"
        },
        {
            "id": 10,
            "categories": ["animals", "wildlife"],
            "image": "https://via.placeholder.com/180?text=Wildlife"
        },
        {
            "id": 11,
            "categories": ["technology", "future"],
            "image": "https://via.placeholder.com/180?text=Technology"
        },
        {
            "id": 12,
            "categories": ["sports", "action"],
            "image": "https://via.placeholder.com/180?text=Sports"
        },
        {
            "id": 13,
            "categories": ["music", "festival"],
            "image": "https://via.placeholder.com/180?text=Festival"
        },
        {
            "id": 14,
            "categories": ["art", "painting"],
            "image": "https://via.placeholder.com/180?text=Art"
        },
        {
            "id": 15,
            "categories": ["winter", "snow"],
            "image": "https://via.placeholder.com/180?text=Winter"
        },
        {
            "id": 16,
            "categories": ["autumn", "leaves"],
            "image": "https://via.placeholder.com/180?text=Autumn"
        },
        {
            "id": 17,
            "categories": ["spring", "blossoms"],
            "image": "https://via.placeholder.com/180?text=Spring"
        },
        {
            "id": 18,
            "categories": ["summer", "beach"],
            "image": "https://via.placeholder.com/180?text=Beach"
        },
        {
            "id": 19,
            "categories": ["mountains", "hiking"],
            "image": "https://via.placeholder.com/180?text=Mountains"
        },
        {
            "id": 20,
            "categories": ["urban", "street art"],
            "image": "https://via.placeholder.com/180?text=Street+Art"
        },
        {
            "id": 21,
            "categories": ["agriculture", "farming"],
            "image": "https://via.placeholder.com/180?text=Farming"
        },
        {
            "id": 22,
            "categories": ["desert", "landscape"],
            "image": "https://via.placeholder.com/180?text=Desert"
        },
        {
            "id": 23,
            "categories": ["ocean", "marine life"],
            "image": "https://via.placeholder.com/180?text=Marine+Life"
        },
        {
            "id": 24,
            "categories": ["night", "city lights"],
            "image": "https://via.placeholder.com/180?text=Night+City"
        },
        {
            "id": 25,
            "categories": ["food", "cuisine"],
            "image": "https://via.placeholder.com/180?text=Cuisine"
        },
        {
            "id": 26,
            "categories": ["architecture", "modern"],
            "image": "https://via.placeholder.com/180?text=Architecture"
        },
        {
            "id": 27,
            "categories": ["people", "crowd"],
            "image": "https://via.placeholder.com/180?text=Crowd"
        },
        {
            "id": 28,
            "categories": ["children", "play"],
            "image": "https://via.placeholder.com/180?text=Play"
        },
        {
            "id": 29,
            "categories": ["vintage", "retro"],
            "image": "https://via.placeholder.com/180?text=Retro"
        },
        {
            "id": 30,
            "categories": ["office", "work"],
            "image": "https://via.placeholder.com/180?text=Office"
        }
    ]);
    
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
            <Navbar />
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
                <Flex mt="8" mb="8" justify="center">
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