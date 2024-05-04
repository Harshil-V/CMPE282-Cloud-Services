/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Image,
  Button,
  Grid,
  useBreakpointValue,
  useToast,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  useDisclosure,
  Heading
} from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import Navbar from "./NavBar";
import { debounce } from "lodash"; // For debouncing
import { fetchUserAttributes } from "aws-amplify/auth";
import axios from "axios";


// Modal for adding descriptions to images
const DescriptionModal = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (description.trim() === "") {
      toast({
        title: "Description required",
        description: "Please enter a description for the image.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit(description);
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Image Description</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for the image"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit}>Save</Button>
          <Button ml="3" onClick={handleCancel}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const imagesPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const errorOccured = useRef(false);
  const inputFileRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authUser, setAuthUser] = useState("");
  const [loading, setLoading] = useState(true);

  // Debounced filtering function
  const debouncedFilter = debounce(() => {
    const filtered = images.filter((image) => {
      // Check that tags exist and filter based on the search term
      return (
        image &&
        Array.isArray(image.tags) &&
        image.tags
          .map((tag) => tag.tagName)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    });
    setTotalPages(Math.ceil(filtered.length / imagesPerPage));
    setFilteredImages(filtered.slice(0, imagesPerPage));
  }, 300);

  // Fetch user attributes to get the email
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

  // Fetch images data
  useEffect(() => {
    if (!authUser) return;

    const fetchImageData = async () => {
      try {
        const response = await fetch(`http://ec2-54-243-13-64.compute-1.amazonaws.com:8080/file/getUserFilesDetails/${authUser}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setImages(data); // Assuming single image object, wrap in an array
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        if (!errorOccured.current) {
          errorOccured.current = true;
        }
        toast({
          title: "An error occurred",
          description: "Failed to fetch images.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchImageData();
    console.log(authUser);
    console.log("filter",images);
  }, [authUser, toast]);

  useEffect(() => {
    debouncedFilter();
  }, [searchTerm, imagesPerPage, debouncedFilter]);

  // Handle pagination
  const handlePageClick = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    setFilteredImages(images.slice(startIndex, endIndex));
  };

  // Handle file input change
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please choose a file smaller than 20 MB.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setNewImage(file);
      onOpen();
    }
  };

  // Upload image
  const handleImageUpload = async (file, description) => {
    // Prepare the form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileDesc', description);
    formData.append('versionNo', 1);
    formData.append('userEmail', authUser);
    
  
    // Debug: Check the contents of the form data
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      // Make an Axios request to upload the image
      const response = await axios.post(
        'http://ec2-54-243-13-64.compute-1.amazonaws.com:8080/file/uploadFile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure that the right header is used for form data
          },
        }
      );
  
      console.log(response);

      alert(`${response.data}`);

      if (response.status === 200) {
        // Extract the data and update the images state
        const data = response.data;
        setImages((prevImages) => [...prevImages, data]);
  
        // Show a success message
        toast({
          title: 'Upload successful',
          description: 'Your image has been uploaded successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        location.reload();
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      // Handle the error with a toast notification
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your image.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  // Submit description for new image
  const handleDescriptionSubmit = async (description) => {
    if (newImage) {
      try {
        await handleImageUpload(newImage, description);
        setNewImage(null);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };

  // Delete image
// Function to delete an image by its fileName via API and update the local grid
const handleDeleteImage = async (fileName) => {
  try {
    // Call the API to delete the image
    const response = await fetch(`http://ec2-54-243-13-64.compute-1.amazonaws.com:8080/file/delete/${fileName}`, {
      method: 'DELETE',
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`);
    }

    // Remove the image from the local list
    const updatedImages = images.filter((image) => image.fileName !== fileName);
    setImages(updatedImages);

    // Adjust the pagination
    handlePageClick(
      Math.max(
        1,
        Math.min(currentPage, Math.ceil(updatedImages.length / imagesPerPage))
      )
    );

    // Show success notification
    toast({
      title: 'Image deleted',
      description: 'The image has been successfully deleted.',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  } catch (error) {
    // Handle any errors during the API call
    toast({
      title: 'Error deleting image',
      description: `Unable to delete the image: ${error.message}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    console.error('Error deleting image:', error);
  }
};


  // Download image
  const handleDownloadImage = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    // fetch(url, { mode: "no-cors" })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     // Create a blob URL that can be opened in a new tab
    //     const blobUrl = URL.createObjectURL(blob);
    //     // Open the blob URL in a new tab
    //     window.open(blobUrl, '_blank', 'noopener,noreferrer');
    //     // Optionally revoke the blob URL to free memory
    //     URL.revokeObjectURL(blobUrl);
    //   })
    //   .catch((e) => {
    //     console.error("Failed to open image", e);
    //     toast({
    //       title: "Image Open Failed",
    //       description: "Unable to open the image in a new tab.",
    //       status: "error",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //   });
  };
  
  

  const gridTemplateColumns = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
    xl: "repeat(5, 1fr)",
  });

  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
        px={[4, 8, 12]}
      >
        <Heading mt={3} as="h5" size="lg">
          Your Image Library
        </Heading>
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          mb={6}
          mt={[4, 6, 8]}
          flexWrap="wrap"
        >
          <Input
            placeholder="Search images by tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            flex="1"
            mr={4}
          />
          <Button onClick={handleUploadClick} colorScheme="blue">
            Upload
          </Button>
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </Flex>
        <Grid templateColumns={gridTemplateColumns} gap={6} w="full">
          {filteredImages.map((image, index) => (
            <Box
              key={index}
              p={2}
              boxShadow="2xl"
              borderRadius="lg"
              _hover={{ boxShadow: "3xl" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={image.fileURL}
                alt={`Image ${image.fileDesc}`}
                boxSize="180px"
                objectFit="cover"
                borderRadius="md"
                mb={2}
              />
              {/* <Text mb={2} fontWeight="bold">{image.fileDesc}</Text> */}
              <Flex justify="center" w="full" overflowX="auto" px={2}>
                {Array.isArray(image.tags) && image.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Text
                    key={tagIndex}
                    fontSize="xs"
                    p={1}
                    bg="gray.200"
                    borderRadius="md"
                    mx={1}
                    my={1}
                    whiteSpace="nowrap"
                  >
                    {tag.tagName}
                  </Text>
                ))}
              </Flex>
              <Flex justify="flex-end" w="full" px={2}>
                <IconButton
                  aria-label="Download image"
                  icon={<DownloadIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="teal"
                  onClick={() =>
                    handleDownloadImage(image.fileURL, `download-${image.fileName}`)
                  }
                  mt={2}
                />
                <IconButton
                  aria-label="Delete image"
                  icon={<DeleteIcon />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDeleteImage(image.fileName)}
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
              colorScheme={currentPage === i + 1 ? "teal" : "gray"}
            >
              {i + 1}
            </Button>
          ))}
        </Flex>
      </Flex>

      <DescriptionModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleDescriptionSubmit}
      />
    </>
  );
};

export default Dashboard;
