import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import axios from 'axios';
import { withRouter } from "react-router";
// Selectors
import { selectCurrentUser } from "../../redux/user/user.selectors";
// Components
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// Styles
import "./contact-form.styles.scss";

const ContactForm = (props) => {

  const initialState = {
    email: "",
    message: "",
    buttonText: "Send message",
  }

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (props.currentUser && props.currentUser.email) {
      setState((prevState) => ({
        ...prevState,
        email: props.currentUser.email,
      }));
    }
  }, [props.currentUser]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, message } = state; 
    setState((prevState) => ({ ...prevState, buttonText: "Sending..."}))

    axios({
      url: '/message',
      method: 'post',
      data: {
        email,
        message
      },
    })
      .then(res => {
        if (res.data.status === 'success') {
          setState((prevState) => ({ ...prevState, buttonText: "Success! :)"}))
          window.setTimeout(() => {
            setState(initialState);
            props.history.push('/');
            window.scrollTo(0, 0);
          }, 2500);
        } else {
          setState((prevState) => ({ ...prevState, buttonText: "Error! :("}))
        }
      })
      .catch(error => {
        console.log(error);
        setState((prevState) => ({ ...prevState, buttonText: "Error! :("}))
      });
    };

  return (
    <div className="contact-form">
      <h2 className="title">Leave your message</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          style={{ background: "rgba(245,245,245,0.6)" }}
          name="email"
          type="email"
          value={state.email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          Tag="textarea"
          style={{
            height: "150px",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            background: "rgba(245,245,245,0.6)",
          }}
          name="message"
          type="textarea"
          value={state.message}
          handleChange={handleChange}
          label="message"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">{state.buttonText}</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(ContactForm));
