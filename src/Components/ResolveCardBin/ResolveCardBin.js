import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import Loader from "../Loader/Loader"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ResolveCardBin.css";



const validationSchema = Yup.object().shape({
    card: Yup.string()
    .min(6, 'Card bin must be 6 characters')
    .max(6, 'Card bin must be 6 characters')
    .required('Card bin is required'),
});


const ResolveCardBin = () => {
    const [cardDetails, setCardDetails] = useState()
    const handleSubmit = async (values, actions) => {
        try {
          // Paystack Initialization API Call
          const initResponse = await axios.get(`https://api.paystack.co/decision/bin/${values.card}`, {
        
           headers: {
    
              "Authorization": "Bearer sk_test_c26db9b3e7321266a9801efae65ee86139393b54",
              "content-type": "application/json",
            }
            
          });
          console.log(initResponse.data);
          if(initResponse && initResponse.data.status == true && initResponse.data.data.brand != "Unknown") { 
          setCardDetails(initResponse.data.data);
          toast.success("Correct account details!") 
          } else {
            toast.error('Invalid Card bin!')
          }
    
          
        } catch (error) {
          actions.setSubmitting(false);
          toast.error(error.response.data.message)
    
        }
    
    
      };
      return (
        <>

            <Formik
            initialValues={{
                card: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                                  <div className="form-container">
                                  <div className="form-wrapper">
                  
                <Form>
                <div className="form-control">
                <h2>Resolve Card Bin</h2>
                <p>  Enter First 6 digiits of your card</p>

                <Field type="text" name="card" placeholder="Enter card Bin" />
                <ErrorMessage name='card' component='div' className='error' />
                </div>
        
                {isSubmitting ? (
                    <Loader/>
                ) : (
        
                <button className='submit' type="submit" disabled={isSubmitting}>
                    Pay Now
                </button>
                )}
                <ToastContainer/>
                </Form>
                </div>
                </div>
            )}
            </Formik>
            {/* {cardDetails && JSON.stringify(cardDetails)} */}
            <div className='userdetailes'>    
              {cardDetails && (
  <>
    <h2 className='user'>Account Details</h2>
    <p className='user'>
      {
      Object.entries(cardDetails).map(([key, value], index) => {
        return(
          <>
          <span key={index}>
            {key}: {value}

          </span>
          <br/><br/>
             </>


        )


      })
      }
      </p>
  </>
)}
</div>
 
        </>
      );
}

export default ResolveCardBin
