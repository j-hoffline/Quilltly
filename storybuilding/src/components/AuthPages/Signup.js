import React, {useRef, useState} from "react"
import {Form, Button, Alert, Container} from "react-bootstrap"
import { useAuth } from '../../contexts/AuthContext.js'
import { Link, useHistory } from "react-router-dom"
import "./AuthStyles.css"




export default function Signup(){

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
          }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/homePage")
          } catch {
            setError("Failed to create an account")
          }

          setLoading(false)
    }


    return (
        <>
        
            <Container className="d-flex align-items-center justify-content-center">
            <div className="login align-items-center mt-5">
                
                    <h1 className="text-center mb-4 title">Sign Up</h1> 
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password (6+ characters)</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />

                        </Form.Group>
                        <Button disabled={loading} className="w-100" variant="secondary" type="submit">
                            Sign Up
                        </Button>
                        <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Log In</Link>
                </div>
                    </Form>
               

            </div>
            
        </Container>
        </>

    )
}
