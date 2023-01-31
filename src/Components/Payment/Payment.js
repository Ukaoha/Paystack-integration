import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import Loader from "../Loader/Loader"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// const phoneNumber = /^((\\+[1-9]{1,4}[\\-]*)|(\\([0-9]{2,3}\\)))
// validate inputs
const validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Name must have at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    phoneNumber: Yup.number().required("Phone number is required"),
  amount: Yup.number().required("Amount is required")
});

const Payment = () => {
  const handleSubmit = async (values, actions) => {
    try {
      // Paystack Initialization API Call
      const initResponse = await axios.post("https://api.paystack.co/transaction/initialize", {
        email: values.email,
        amount: values.amount * 100
      }, {
    
        
        headers: {

          "Authorization": "Bearer sk_test_c26db9b3e7321266a9801efae65ee86139393b54",
          "content-type": "application/json",
        }
        
      });
      console.log(initResponse.data);
      if(initResponse) { 
       await createChargeResponse(initResponse , values , actions) 
      }

      // Paystack Charge API Call
      // const chargeResponse = await axios.post("https://api.paystack.co/transaction/charge_authorization",{
      //   authorization_code: `AUTH_${initResponse.data.data.access_code}`,
      //   email: values.email,
      //   amount:  values.amount * 100
      // }, {
      //   headers: {
          
      //     "Authorization": "Bearer sk_test_c26db9b3e7321266a9801efae65ee86139393b54",
      //     "content-type": "application/json"
      //   }
      // });

      // console.log(chargeResponse);

      // if (chargeResponse.data.data.status === "success") {
      //   actions.setSubmitting(false);
      //   toast.success("Payment successful!");

      // } else {
      //   actions.setSubmitting(false);
      //   toast.error('Payment failed!')

      // }
    } catch (error) {
      actions.setSubmitting(false);
      toast.error(error.message)

    }


  };
  const createChargeResponse = async (initResponse , values, actions) => {
    const chargeResponse = await axios.post("https://api.paystack.co/transaction/charge_authorization",{
      authorization_code: `AUTH_${initResponse.data.data.access_code}`,
      email: values.email,
      amount:  values.amount * 100
    }, {
      headers: {
        
        "Authorization": "Bearer sk_test_c26db9b3e7321266a9801efae65ee86139393b54",
        "content-type": "application/json"
      }
    });
    if (chargeResponse.data.data.status === "success") {
      actions.setSubmitting(false);
      toast.success("Payment successful!");

    } else {
      actions.setSubmitting(false);
      toast.error('Payment failed!')

    }


  }
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: "", 
        phoneNumber: "" 
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
        <Field type="text" name="name" placeholder="Name" />
  <ErrorMessage name='name' component='div' className='error' />

          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage name='email' component='div' className='error' />

          <Field type="number" name="amount" placeholder="Amount" />
          <ErrorMessage name='amount' component='div' className='error' />
          <Field type="number" name="phoneNumber" placeholder="Phone number" />
          <ErrorMessage name='phoneNumber' component='div' className='error' />

          {isSubmitting ? (
            <Loader/>
          ) : (

          <button type="submit" disabled={isSubmitting}>
            Pay Now
          </button>
          )}
          <ToastContainer/>
        </Form>
      )}
    </Formik>
  );
};

export default Payment;
