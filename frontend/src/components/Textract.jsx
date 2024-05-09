import { useState, useEffect, useRef } from 'react';
import {
  Box, Button, VStack, Input, Text, Image, useToast, Textarea, Center, Container, HStack
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './NavBar';

const baseURL = "http://34.193.57.242:8080";

const Textract = () => {
  const [file, setFile] = useState(null);
  const [responseList, setResponseList] = useState([]);
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const textareaRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponseList([]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No file selected.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseURL}/file/uploadTextractFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponseList(response.data);
    } catch (error) {
      toast({
        title: 'Error uploading file',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClear = () => {
    setFile(null);
    setResponseList([]);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseList.join('\n')).then(() => {
      setCopied(true);
      toast({
        title: 'Text copied!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    });
  };

  // Dynamically adjusts the Textarea height
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset to auto to measure correctly
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to new height
    }
  };

  // Use effect to update the textarea height whenever responseList changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [responseList]);

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" centerContent mt={5}>
        <Box p={6} bg="gray.100" w="100%" maxW="3xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Center><Text fontSize="3xl" mb={5}>Extract Text From Images</Text></Center>
          <VStack spacing={6}>
            <label htmlFor="file-upload">
              <Button as="span" colorScheme="blue">
                Select File
              </Button>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                display="none"
              />
            </label>
            <HStack spacing={5}>
              <Button colorScheme="green" onClick={handleUpload} isDisabled={!file}>Upload</Button>
              <Button colorScheme="gray" onClick={handleClear}>Clear</Button>
            </HStack>

            {file && (
              <Box my={4} boxSize="100%" overflow="hidden">
                <Image src={URL.createObjectURL(file)} alt="Selected File" objectFit="contain" />
                <Text mt={2}>Image Preview</Text>
              </Box>
            )}

            {responseList.length > 0 && (
              <Box mt={4} p={4} boxSize="100%">
                <Text fontSize="xl">Text Extraction (OCR)</Text>
                <Textarea
                  value={responseList.join('\n')}
                  isReadOnly
                  ref={textareaRef}
                  onInput={adjustTextareaHeight}
                />
                <Button mt={3} colorScheme="blue" onClick={handleCopy} isDisabled={!responseList.length || copied}>
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Box>
            )}
          </VStack>
        </Box>
      </Container>
    </>
  );
};

export default Textract;
