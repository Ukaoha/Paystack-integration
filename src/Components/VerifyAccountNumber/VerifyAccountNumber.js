import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import Loader from "../Loader/Loader"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Verify.css";



const validationSchema = Yup.object().shape({
    account_number: Yup.string()
    .min(10, 'Account Number must be 10 digits long')
    .max(10, 'Account Number must be 10 digits long')
    .required('Account Number is required'),
    bank_code: Yup.string()
    .required("You have to select a bank"),
});

const VerifyAccountNumber = () => {
  const [userDetails, setUserDetails] = useState();
    const handleSubmit = async (values, actions) => {
        try {
          // Paystack Initialization API Call
          const initResponse = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${values.account_number}&bank_code=${values.bank_code}`, {
        
            
            headers: {
    
              "Authorization": "Bearer sk_test_c26db9b3e7321266a9801efae65ee86139393b54",
              "content-type": "application/json",
            }
            
          });
          if(initResponse && initResponse.data.status == true) {
          setUserDetails(initResponse.data.data);
            toast.success("Correct account details!") 
          }
    
        
        } catch (error) {
          actions.setSubmitting(false);
          // console.log(error.response.data.message);
          toast.error(error.response.data.message)
    
        }
    
    
      };
      return (
        <>
          <Formik
            initialValues={{
              account_number: "",
              bank_code: "", 
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
                                  <div className="form-container">
                                  <div className="form-wrapper">
                  
              <Form>
              <div className="form-control">
                <h2><span className='highlight'>Verify  </span> Account Number</h2>

                <Field type="text" name="account_number" placeholder="Account Number" />
                <ErrorMessage name='account_number' component='div' className='error' />
                </div>
                <div className="custom-select" style={{width:"100%"}}>

        
                <Field as="select" name="bank_code">
                  <option value="">Select Bank</option>
                  <option value={"044"} >Access Bank Nigeria Plc</option>
                  <option value={"063"} >Diamond Bank Plc</option>
                  <option value={"050"} >Ecobank Nigeria</option>
                  <option value={"084"} >Enterprise Bank Plc</option>
                  <option value={"070"} >Fidelity Bank Plc</option>
                  <option value={"011"} >First Bank of Nigeria Plc</option>
                  <option value={"214"} >First City Monument Bank</option>
                  <option value={"058"} >Guaranty Trust Bank Plc</option>
                  <option value={"030"} >Heritaage Banking Company Ltd</option>
                  <option value={"301"} >Jaiz Bank</option>
                  <option value={"082"} >Keystone Bank Ltd</option>
                  <option value={"014"} >Mainstreet Bank Plc</option>
                  <option value={"076"} >Skye Bank Plc</option>
                  <option value={"039"} >Stanbic IBTC Plc</option>
                  <option value={"232"} >Sterling Bank Plc</option>
                  <option value={"032"} >Union Bank Nigeria Plc</option>
                  <option value={"033"} >United Bank for Africa Plc</option>
                  <option value={"215"} >Unity Bank Plc</option>
                  <option value={"035"} >WEMA Bank Plc</option>
                  <option value={"057"} >Zenith Bank International</option>
              </Field> 
                <ErrorMessage name='bank_code' component='div' className='error' />
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
          <div className='userdetailes'>    
              {userDetails && (
  <>
    <h2 className='user'>Account Details</h2>
    <p className='user'>
      {
      Object.entries(userDetails).map(([key, value], index) => {
        return(
          <>
          <span key={index}>
            {key}: { value}

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

export default VerifyAccountNumber








 
	
	
	
	




