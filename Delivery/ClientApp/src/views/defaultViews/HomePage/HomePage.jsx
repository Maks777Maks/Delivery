import React, { Component } from 'react';
import dishes_1 from '../../../assets/img/dishes_1.jpg';
import hero_1 from '../../../assets/img/hero_1.jpg';
import hero_2 from '../../../assets/img/hero_2.jpg';
import dishes_4 from '../../../assets/img/dishes_4.jpg';
import dishes_2 from '../../../assets/img/dishes_2.jpg';
import dishes_3 from '../../../assets/img/dishes_3.jpg';
import { Link } from 'react-router-dom';
import '../scss/style.scss';
class HomePage extends Component {
    state = {  }
    render() { 
        const content = (
            <React.Fragment>
                 <header role="banner">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Eatery</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample05">
            <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Recipes</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                <div className="dropdown-menu" aria-labelledby="dropdown04">
                  <a className="dropdown-item" href="/">Catering</a>
                  <a className="dropdown-item" href="/">Birthday Party</a>
                  <a className="dropdown-item" href="/">Wedding Party</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">About</a>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="/#/login">Вхід</a> */}
                <Link className="nav-link" to="/login" >Вхід</Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item cta-btn">
                <a className="nav-link" href="/">Contact Us</a>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </header>
    <section className="home-slider owl-carousel">
      <div className="slider-item" style={{backgroundImage: "url(" + hero_1 + ")"}}>
        
        <div className="container">
          <div className="row slider-text align-items-center justify-content-center">
            <div className="col-md-8 text-center col-sm-12 ">
              <h1>Expert Chefs</h1>
              <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi unde impedit, necessitatibus, soluta sit quam minima expedita atque corrupti reiciendis.</p>
              <p><a href="#" className="btn btn-white btn-outline-white">Get Started</a></p>
            </div>
          </div>
        </div>

      </div>
      <div className="slider-item" style={{backgroundImage: "url(" + hero_2 + ")"}}>
        <div className="container">
          <div className="row slider-text align-items-center justify-content-center">
            <div className="col-md-8 text-center col-sm-12 ">
              <h1>Delecious Food</h1>
              <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi unde impedit, necessitatibus, soluta sit quam minima expedita atque corrupti reiciendis.</p>
              <p><a href="#" className="btn btn-white btn-outline-white">Get Started</a></p>
            </div>
          </div>
        </div>
        
      </div>

    </section>
    <section className="section bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
            <span className="flaticon-cheers display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Drinks</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae hic maiores. Velit nisi, reprehenderit, nobis officia.</p>
          </div>
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
            <span className="flaticon-fish display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Sea Foods</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae hic maiores. Velit nisi, reprehenderit, nobis officia.</p>
          </div>
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
            <span className="flaticon-coffee-cup display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Cup Coffees</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae hic maiores. Velit nisi, reprehenderit, nobis officia.</p>
          </div>
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center">
            <span className="flaticon-salad display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Fresh Salad</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae hic maiores. Velit nisi, reprehenderit, nobis officia.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="section ">
        <div className="clearfix mb-5 pb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center heading-wrap">
                        <h2>Special Dishes</h2>
                        <span className="back-text">Dishes</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="owl-carousel centernonloop">
        <a href="#" className="item-dishes">
          <div className="text">
            <p className="dishes-price">$11.50</p>
            <h2 className="dishes-heading">Organic tomato salad, gorgonzola cheese, capers</h2>
          </div>
          <img src="img/dishes_1.jpg" alt="" className="img-fluid"/>
        </a>
        <a href="#" className="item-dishes">
            <div className="text">
                <p className="dishes-price">$12.00</p>
                <h2 className="dishes-heading">Baked broccoli</h2>
            </div>
            <img src="img/dishes_2.jpg" alt="" className="img-fluid"/>
        </a>
        <a href="#" className="item-dishes">
            <div className="text">
                <p className="dishes-price">$11.00</p>
                <h2 className="dishes-heading">Spicy meatballs</h2>
            </div>
            <img src="img/dishes_3.jpg" alt="" className="img-fluid"/>
        </a>
        <a href="#" className="item-dishes">
            <div className="text">
                <p className="dishes-price">$12.00</p>
                <h2 className="dishes-heading">Eggplant parmigiana</h2>
            </div>
            <img src="img/dishes_4.jpg" alt="" className="img-fluid"/>
        </a>
    </div>
</section>
    <section className="section bg-light ">

      <div className="clearfix mb-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center heading-wrap">
              <h2>Our Menu</h2>
              <span className="back-text-dark">Menu</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        
        <div className="row no-gutters">
          <div className="col-md-6">
            <div className="sched d-block d-lg-flex">
              <div className="bg-image order-2" style={{backgroundImage: "url(" + dishes_4 + ")"}}></div>
              <div className="text order-1">
                <h3>Grilled Caesar salad, shaved reggiano</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...</p>
                <p className="text-primary h3">$12.00</p>
              </div>
              
            </div>

            <div className="sched d-block d-lg-flex">
              <div className="bg-image" style={{backgroundImage: "url(" + dishes_1 + ")"}}></div>
              <div className="text">
                <h3>Spicy Calamari and beans</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...</p>
                <p className="text-primary h3">$12.00</p>
                
              </div>
              
            </div>

          </div>

          <div className="col-md-6">
            <div className="sched d-block d-lg-flex">
              <div className="bg-image order-2" style={{backgroundImage: "url(" + dishes_2 + ")"}}></div>
              <div className="text order-1">
                <h3>Bacon wrapped wild gulf prawns</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...</p>
                <p className="text-primary h3">$18.00</p>
                
              </div>
              
            </div>

            <div className="sched d-block d-lg-flex">
              <div className="bg-image" style={{backgroundImage: "url(" + dishes_3 + ")"}}></div>
              <div className="text">
                <h3>Seared ahi tuna fillet*, honey-ginger sauce</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...</p>
                <p className="text-primary h3">$16.00</p>
                
              </div>
              
            </div>

          </div>
        </div>
        

      </div>
    </section>
    <section className="section ">
      <div className="clearfix mb-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center heading-wrap">
              <h2>Testimonial</h2>
              <span className="back-text">Testimonial</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <blockquote className="testimonial">
              <p>&ldquo; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, obcaecati? Quis eum minus, sequi atque quisquam ducimus aliquam veritatis nobis cum iusto neque enim explicabo maxime natus doloribus, fuga sunt. &rdquo;</p>
              <div className="d-flex author">
                <img src="img/person_1.jpg" alt="" className="mr-4"/>
                <div className="author-info">
                  <h4>Mellisa Howard</h4>
                  <p>CEO, XYZ Company</p>
                </div>
              </div>  
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="testimonial">
              <p>&ldquo; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, obcaecati? Quis eum minus, sequi atque quisquam ducimus aliquam veritatis nobis cum iusto neque enim explicabo maxime natus doloribus, fuga sunt. &rdquo;</p>
              <div className="d-flex author">
                <img src="img/person_2.jpg" alt="" className="mr-4"/>
                <div className="author-info">
                  <h4>Mike Richardson</h4>
                  <p>CEO, XYZ Company</p>
                </div>
              </div>  
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="testimonial">
              <p>&ldquo; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, obcaecati? Quis eum minus, sequi atque quisquam ducimus aliquam veritatis nobis cum iusto neque enim explicabo maxime natus doloribus, fuga sunt. &rdquo;</p>
              <div className="d-flex author">
                <img src="img/person_3.jpg" alt="" className="mr-4"/>
                <div className="author-info">
                  <h4>Charles White</h4>
                  <p>CEO, XYZ Company</p>
                </div>
              </div>  
            </blockquote>
          </div>
        </div>
      </div>
    </section>
    <section className="section ">
      <div className="clearfix mb-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center heading-wrap">
              <h2>Blog</h2>
              <span className="back-text">Our Blog</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="blog d-block d-lg-flex">
              <div className="bg-image" style={{backgroundImage: "url(" + dishes_1 + ")"}}></div>
              <div className="text">
                <h3>How to cook beef steak with sauce</h3>
                <p className="sched-time">
                  <span><span className="fa fa-calendar"></span> April 22, 2018</span> <br/>
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...</p>
                
                <p><a href="#" className="btn btn-primary btn-sm">Read More</a></p>
                
              </div>
              
            </div>
          </div>
          <div className="col-md-6">
            <div className="blog d-block d-lg-flex">
              <div className="bg-image" style={{backgroundImage: "url(" + dishes_2 + ")"}}></div>
              <div className="text">
                <h3>How to cook beef steak with sauce</h3>
                <p className="sched-time">
                  <span><span className="fa fa-calendar"></span> April 22, 2018</span> <br/>
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto illo delectus...</p>
                
                <p><a href="#" className="btn btn-primary btn-sm">Read More</a></p>
                
              </div>
              
            </div>
          </div>
        </div>
      </div>

    </section>
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="row">
              <div className="col-md-12">
                <h3>Subsribe Newsletter</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ex temporibus magni ipsam inventore dolorum sunt, amet vel.</p>
              </div>

              <form action="" className="col-12">
                <div className="row align-items-center">
                <div className="col-md-8 mb-3 mb-md-0">
                  <input type="text" className="form-control" placeholder="Enter Email Address"/>
                </div>
                <div className="col-md-4">
                  <input type="submit" className="btn btn-primary btn-block" value="Subscribe"/>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4 mb-5">
            <h3>About Us</h3>
            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus et dolor blanditiis consequuntur ex voluptates perspiciatis omnis unde minima expedita.</p>
            <ul className="list-unstyled footer-link d-flex footer-social">
              <li><a href="#" className="p-2"><span className="fa fa-twitter"></span></a></li>
              <li><a href="#" className="p-2"><span className="fa fa-facebook"></span></a></li>
              <li><a href="#" className="p-2"><span className="fa fa-linkedin"></span></a></li>
              <li><a href="#" className="p-2"><span className="fa fa-instagram"></span></a></li>
            </ul>

          </div>
          <div className="col-md-5 mb-5">
            <div className="mb-5">
              <h3>Opening Hours</h3>
              <p><strong className="d-block">Sunday-Thursday</strong> 5AM - 10PM</p>
            </div>
            <div>
              <h3>Contact Info</h3>
              <ul className="list-unstyled footer-link">
                <li className="d-block">
                  <span className="d-block">Address:</span>
                  <span className="text-white">34 Street Name, City Name Here, United States</span></li>
                <li className="d-block"><span className="d-block">Telephone:</span><span className="text-white">+1 242 4942 290</span></li>
                <li className="d-block"><span className="d-block">Email:</span><span className="text-white">info@yourdomain.com</span></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 mb-5">
            <h3>Quick Links</h3>
            <ul className="list-unstyled footer-link">
              <li><a href="#">About</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Disclaimers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
          
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-md-center text-left">
            <p>
        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
            </React.Fragment>
        )
        return (  

        content
        );
    }
}
 
export default HomePage;