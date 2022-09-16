import React, { useState } from 'react'
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useHistory } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [pic, setPic] = useState();
    const handleClick = () => setShow(!show);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const postDetails = (pics) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: "please select an image",
                status: "warning",
                duration: 5000,
                inClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dvk0e6zn0");
            fetch("CLOUDINARY_URL=cloudinary://954678835226512:LA9Bm3Wd5_ja83d3BtjQKGgypYg@dvk0e6zn0", {
                    method: 'post',
                    body: data,
                }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "please select an image",
                status: "warning",
                duration: 5000,
                inClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;

        }

    };
    const submitHandler = async() => {
        setLoading(true);
        if (!name || !email || !password || !confirmPass) {
            toast({
                title: "Please fill the required fields",
                status: "warning",
                duration: 5000,
                inClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (password !== confirmPass) {
            toast({
                title: "Passwords do not Match.",
                status: "warning",
                duration: 5000,
                inClosable: true,
                position: "bottom",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                inClosable: true,
                position: "bottom",
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                inClosable: true,
                position: "bottom",
            });
        }
    };
    return ( <
        VStack spacing = "5px" >
        <
        FormControl id = "first-name"
        isRequired >
        <
        FormLabel > Enter Your Name: < /FormLabel> <
        Input placeholder = "Enter your name"
        onChange = {
            ((e) => setName(e.target.value))
        }
        /> < /
        FormControl >
        <
        FormControl id = "email"
        isRequired >
        <
        FormLabel > Email: < /FormLabel> <
        Input placeholder = "Enter your email:"
        onChange = {
            ((e) => setEmail(e.target.value))
        }
        /> < /
        FormControl >
        <
        FormControl id = "password"
        isRequired >
        <
        FormLabel > Password: < /FormLabel> <
        InputGroup > <
        Input type = { show ? "text" : "password" }
        placeholder = "Enter password:"
        onChange = {
            ((e) => setEmail(e.target.value))
        }
        /> <
        InputRightElement width = "4.5rem" >
        <
        Button h = "1.75rem"
        size = "sm"
        onClick = { handleClick } > {
            show ? "Hide" : "Show"
        } <
        /Button> </
        InputRightElement > < /
        InputGroup > <
        /
        FormControl >
        <
        FormControl id = "confirm-password"
        isRequired >
        <
        FormLabel > Confirm Password: < /FormLabel> <
        InputGroup > <
        Input type = { show ? "text" : "password" }
        placeholder = "Enter password:"
        onChange = {
            ((e) => setConfirmPass(e.target.value))
        }
        /> <
        InputRightElement width = "4.5rem" >
        <
        Button h = "1.75rem"
        size = "sm"
        onClick = { handleClick } > {
            show ? "Hide" : "Show"
        } <
        /Button> </
        InputRightElement > < /
        InputGroup > <
        /
        FormControl >
        <
        FormControl id = "pic"
        isRequired >
        <
        FormLabel > Profile Pic: < /FormLabel> <
        Input placeholder = "Upload your Pic:"
        type = "file"
        p = { 1.5 }
        accept = "image/*"
        onChange = {
            (e) => postDetails(e.target.files[0])
        }

        /> < /
        FormControl >
        <
        Button colorScheme = "blue"
        width = "100%"
        style = {
            { marginTop: 15 }
        }
        onClick = { submitHandler }
        isLoading = { loading } > Signup < /Button> < /
        VStack >
    )
}

export default Signup