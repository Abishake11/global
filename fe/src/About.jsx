import '../src/About.css'
import goal from '../src/assets/goal.png'
import tutor from '../src/assets/tutor.png'
import flextime from '../src/assets/flextime.png'
import tutor1 from '../src/assets/tutor1.jpg'
import tutor2 from '../src/assets/tutor2.webp'
import tutor3 from '../src/assets/tutor3.jpg'
import tutor4 from '../src/assets/tutor4.webp'

import { FaStar } from "react-icons/fa6";

// animation import 
import ShinyText from './animations/shinytext';

function About() {
    return (
        <>
            {/* Banner Section */}
            <section className='banner2 space'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-12">
                            <ShinyText
                                text="who we are"
                                disabled={false}
                                speed={3}
                                className='custom-class shine'
                            />
                            <p>Global Online Tuition is a leading Digital learning platform dedicated to providing high-quality education to students worldwide.Our Mission is to make learning Accessible,Engaging,and Effective through personalized online tutoring. We Personalized Online Tutoring. We cater to school students Grades 1-12,College Students, and Competitive Exams Aspirants </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* How it Works Section */}
            <section className='how-works space'>
                <div className='container'>
                    <ShinyText
                        text="How global tuition works"
                        disabled={false}
                        speed={3}
                        className='custom-class shine'
                    />
                    <div className='row gap-3'>
                        <div className='col-md-4 col-12 work-box'>
                            <img src={goal} alt="" />
                            <h5>Register and Set Your Goals</h5>
                            <p>Create your free account in just a few clicks. Tell us what you need help with — from school subjects and university preparation to language learning and professional courses. Set your learning goals and preferences.</p>
                        </div>
                        <div className='col-md-4 col-12 work-box'>
                            <img src={tutor} alt="" />
                            <h5>Find the Perfect Tutor</h5>
                            <p>Our smart matching system connects you with experienced tutors who specialize in your subject and learning style. Browse detailed tutor profiles, including qualifications, reviews, and rates, so you can choose the right fit.</p>
                        </div>
                        <div className='col-md-4 col-12 work-box'>
                            <img src={flextime} alt="" />
                            <h5>Flexible Scheduling</h5>
                            <p>Book lessons at times that suit your schedule. Whether you prefer weekly sessions or intensive study periods, our platform allows you to arrange 1-on-1 online sessions at your convenience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet our tutors section */}
            <section className='meet-tutors space'>
                <div className='container'>
                    <ShinyText
                        text="Meet our tutors"
                        disabled={false}
                        speed={3}
                        className='custom-class shine'
                    />
                    <p>At Global Tuition, we believe great learning happens when expert guidance meets passion and experience. That’s why our hand-picked tutors come from diverse backgrounds, bringing deep knowledge, teaching expertise, and a commitment to your success.</p>
                    <div className='row'>
                        <div className='col-md-3 tutor-card'>
                            <div className='tutor-profile'>
                                <img src={tutor1} alt="" />
                            </div>
                            <p><b> Dr.Priya Sharma - PhD in Mathematics | 10+ Years Experience | Specialized in IIT-JEE Coaching</b></p>
                        </div>
                        <div className='col-md-3 tutor-card'>
                            <div className='tutor-profile'>
                                <img src={tutor2} alt="" />
                            </div>
                            <p><b> Dr.Boopathi Raja - PhD in Science | 10+ Years Experience | Specialized in IIT-JEE Coaching</b></p>
                        </div>
                        <div className='col-md-3 tutor-card'>
                            <div className='tutor-profile'>
                                <img src={tutor3} alt="" />
                            </div>
                            <p><b> Dr.Steeve - PhD in Computer Science | 10+ Years Experience | Specialized in IIT-JEE Coaching</b></p>
                        </div>
                        <div className='col-md-3 tutor-card'>
                            <div className='tutor-profile'>
                                <img src={tutor4} alt="" />
                            </div>
                            <p><b> Dr.Dharshini - PhD in English | 10+ Years Experience | Specialized in IIT-JEE Coaching</b></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section>
                <div className='testimonial space'>
                    <div className="container">
                        <ShinyText
                        text="Meet our tutors"
                        disabled={false}
                        speed={3}
                        className='custom-class shine'
                         />
                
                        <p>Every student’s learning journey is unique, and at Global Tuition, we’re here to support them every step of the way. See how our expert tutors and flexible programs have helped learners worldwide achieve their academic and professional goals.</p>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="stu-profile">
                                    <h5>Kishore</h5>
                                    <div className="star">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
                                    <p>Global Tuition has completely transformed the way I approach my studies. Their expert tutors come from diverse backgrounds and offer personalized support that helped me understand difficult concepts easily. No matter where I am in the world, their flexible online sessions fit my schedule perfectly -</p>
                                </div>

                              
                            </div>
                            <div className="col-md-3">
                                  <div className="stu-profile">
                                    <h5>Balakumar</h5>
                                    <div className="star">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />

                                    </div>
                                    <p>What I love about Global Tuition is how flexible their sessions are. As a busy university student with a part-time job, I could easily schedule online tutoring whenever I needed. The tutors are always professional, patient, and well-prepared. I highly recommend them!</p>

                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stu-profile">
                                    <h5>Vion</h5>
                                    <div className="star">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />

                                    </div>
                                    <p>Before I started with Global Tuition, I used to get really frustrated with science and math. The lessons used to be so confusing! But now, my tutor explains everything in a simple way, and I can ask questions anytime. My grades have improved a lot, and studying has become fun. I’m so happy I joined</p>
                                </div>
                               
                            </div>
                            <div className="col-md-3">
                                 <div className="stu-profile">
                                    <h5>Panerselvam</h5>
                                    <div className="star">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />  

                                    </div>
                                    <p>Being an international student, finding the right support was difficult until I found Global Tuition. Their tutors understand different learning styles and offer personalized help. No matter the subject, I always get clear guidance. It feels like having a tutor by my side, even from thousands of miles away</p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default About