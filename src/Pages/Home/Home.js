import React from 'react';
import logo from '../../images/hero-img.png';
import course1 from '../../images/course1.jpg'
import course2 from '../../images/course2.jpg'
import course3 from '../../images/course3.jpg'

import "./Home.css";
import { Link } from 'react-router-dom';



const Home = () => {
    return (  

        <>      <header>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-title">
                        <h2>Improving Education Through Technology solutions</h2>
                    </div>
                    <div className="sub-title">
                        <p>Providing the best school administration, teaching and learning experience to educators, students and parents through innovative software and technology. 
</p>
                    </div>
                    <button className='btn-blue'><Link to="pay">Buy courses</Link></button>
                </div>
                <div className="hero-img">
                    <img src={logo} alt="" />
                </div>
            </div>
        </header>

        <section>
            <div className="parent-container">
                <div className="course">
                    <img className='course-img' src={course1} alt="" />
                        <h3>Complete Html and CSS crash course</h3>
                        <button className='btn-blues' ><Link to="/pay">Buy Courses </Link></button>
                </div>
                <div className="course">
                    <img className='course-img' src={course2} alt="" />
                        <h3>Complete JavaScript crash course</h3>
                        <button className='btn-blues'><Link to="/pay">Buy Courses </Link></button>
                </div>
                <div  className="course">
                    <img className='course-img' src={course1} alt="" />
                        <h3>Complete Java crash course</h3>
                        <button className='btn-blues'><Link to="/pay">Buy Courses </Link></button>
                </div>


            </div>

        </section>
        </>
  
    );
}
 
export default Home;