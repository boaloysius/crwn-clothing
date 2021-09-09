import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { firebase_auth, auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const {email, password} = this.state;
        try{
            await firebase_auth.signInWithEmailAndPassword(auth, email, password);
            this.setState({email:'', password:''});
        } catch (error){
            console.error(error);
        }
    }

    handleChange = (event) => {
        event.preventDefault()

        const { value, name } = event.target;
        this.setState({[name]: value})
    }

    render(){
     return (
        <div className="sign-in">
            <h2>I already have an account </h2>
            <span>Sign in with your username and password</span>
            <form onSubmit={this.handleSubmit}>
                <FormInput 
                    name="email" 
                    type="email" 
                    handleChange={this.handleChange} 
                    value = {this.state.email} 
                    label='email'
                    required
                />
                <FormInput 
                    name="password" 
                    type="password" 
                    value = {this.state.password}
                    handleChange={this.handleChange} 
                    label="password"
                    required
                />
                <CustomButton type="submit">Sign In</CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                    Sign In with Google
                </CustomButton>
            </form>

        </div>
        )
     }
}

export default SignIn; 