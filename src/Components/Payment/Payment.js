import React from 'react';
import { useState } from 'react';
import {PaystackButton} from 'react-paystack';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Payment.css";



const Payment = () => {
  const [name , setName] = useState("");
  const [email, setEmail] = useState('');
  const[phoneNumber,  setPhoneNumber] = useState('');
  const [amount , setamount] = useState(0);
  const publicKey = 'pk_test_9876a5216aa5caf77e4d8c2e014453a13e28ee5c'
  

  const BuyCourses = { 
    email,
    amount: amount*100,
    metaData: {
      name,
      phoneNumber,
    },
    publicKey,
    text:" Register Now",
    onSuccess:() => 
      toast.success("You have Successfully registerd this course"),
      onClose:() => toast.error(" Transaction was unsuccessfull"),
    }



  return (
    <>
                    <div className="form-container">
                <div className="form-wrapper">

    <form action="">
    <div className="form-control">

    <h2><span className='highlight'>Registar </span> Courses</h2>

      <input type="text"placeholder='Enter Name'
      onChange={(e) => setName(e.target.value)} 
       />
       </div>
       <div className="form-control">

             <input type="email"placeholder='Enter email'
      onChange={(e) => setEmail(e.target.value)} 
       />
       </div>
       <div className="form-control">

             <input type="number"placeholder='Enter amount'
      onChange={(e) => setamount(e.target.value)} 
       />
       </div>
       <div className="form-control">

             <input type="number"placeholder='Enter Phone Number'
      onChange={(e) => setPhoneNumber(e.target.value)} 
       />
       </div>
       < ToastContainer/>


    </form>
    <div className="register">

<PaystackButton className="paystack" {...BuyCourses} />

</div>

    </div>
    </div>

    </>
    );
}
 
export default Payment;