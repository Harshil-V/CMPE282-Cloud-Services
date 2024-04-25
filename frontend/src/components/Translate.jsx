import { useState } from 'react';
import {
    Box, Button, Container, FormControl, FormLabel, Select, Textarea, VStack,
    HStack, Center, Heading, Text, useToast, Badge
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from './NavBar';

const Translation = () => {
    const [selectLanguageCode, setSelectedLanguageCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [segmentation, setSegmentation] = useState('');
    const toast = useToast();

    const handleLanguageChange = (code, language) => {
        setSelectedLanguageCode(code);
        setSelectedLanguage(language);
        console.log(language);
    };

    const callTranslationAPI = async () => {
        console.log(`Text: ${inputText}`)
        console.log(`Code: ${selectLanguageCode}`)
        setAudioUrl('');
        try {
            const response = await axios.post("http://myalb-1741799579.us-west-2.elb.amazonaws.com/translate/", {
                text: inputText,
                language: selectLanguageCode
            });

            setOutputText(response.data.translatedText);

            if (response.data.audioStream && response.data.audioStream.data && response.data.audioStream.data.length > 0) {
                const audioData = new Uint8Array(response.data.audioStream.data);
                const audioBlob = new Blob([audioData], { type: 'audio/mp3' });
                const audioURLGen = URL.createObjectURL(audioBlob);
                setAudioUrl(audioURLGen);
            } else {
                toast({
                    title: "No Audio Stream Received.",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
            }

            setSegmentation(response.data.sentiment);
        } catch (error) {
            toast({
                title: "There was an error",
                description: `${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const handleTranslate = () => {
        if (!inputText.trim()) {
            toast({
                title: "Input Field is Empty",
                description: "Please enter some text to translate.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
        } else {
            callTranslationAPI();
        }
    };

    return (
        <>
            <Navbar />
            <Container maxW="container.md" bg="gray.200" p={4} borderRadius="lg" mt={5}>
                <Center><Heading as="h2" size="lg" p={4}>Language Translation</Heading></Center>
                <VStack spacing={4}>
                    <Box p={4} w="full" bg="white" borderRadius="md">
                        <Text mb={2}>Input</Text>
                        <VStack align="stretch">
                            <FormControl id="inputText">
                                <FormLabel>Enter Text:</FormLabel>
                                <Textarea
                                    placeholder="Type here..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    size="sm"
                                />
                            </FormControl>
                            <FormControl id="languageDropdown">
                                <FormLabel>Language:</FormLabel>
                                <Select
                                    placeholder={`Language: ${selectedLanguage} - ${selectLanguageCode}`}
                                    onChange={(e) => {
                                        const [code, language] = e.target.value.split('-');
                                        handleLanguageChange(code.trim(), language.trim());
                                    }}
                                >
                                    <option value="en-US - US English">US English</option>
                                    <option value="en-IN - Indian English">Indian English</option>
                                    <option value="es - Spanish">Spanish</option>
                                    <option value="fr - French">French</option>
                                    <option value="ar - Arabic">Arabic</option>
                                    <option value="de - German">German</option>
                                    <option value="it - Italian">Italian</option>
                                    <option value="ja - Japanese">Japanese</option>
                                </Select>
                            </FormControl>
                            <Button colorScheme="blue" onClick={handleTranslate} mt={4}>Translate</Button>
                        </VStack>
                    </Box>
                    <Box p={4} w="full" bg="white" borderRadius="md">
                        <Text mb={2}>Output</Text>
                        <VStack align="stretch">
                            <FormControl id="outputText">
                                <FormLabel>Translated Text:</FormLabel>
                                <Textarea
                                    value={outputText}
                                    readOnly
                                />
                            </FormControl>
                            {audioUrl && (
                                <Box>
                                    <audio controls>
                                        <source src={audioUrl} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </Box>
                            )}
                            {segmentation && (
                                <HStack>
                                    <Text>Sentiment Analysis:</Text>
                                    <Badge colorScheme="green">{segmentation}</Badge>
                                </HStack>
                            )}
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </>
    );
}

export default Translation;
