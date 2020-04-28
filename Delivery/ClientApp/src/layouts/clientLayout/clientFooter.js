import React from 'react';
// import { Link } from 'react-router-dom';
const Footer = () => {
return(<React.Fragment>
    <footer className="site-footer" role="contentinfo">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-6 mb-5">
                                <h3>Про нас</h3>
                                <p className="mb-5">Готуємо з органічних продуктів. <br/>Смачна кухня. <br/>Швидка доставка по місту.</p>
                                <ul className="list-unstyled footer-link d-flex footer-social">
                                    <li><a href="https://twitter.com/" rel="noopener noreferrer" target="_blank" className="p-2"><span className="fa fa-twitter"></span></a></li>
                                    <li><a href="https://facebook.com/" rel="noopener noreferrer" target="_blank" className="p-2"><span className="fa fa-facebook"></span></a></li>
                                    <li><a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank" className="p-2"><span className="fa fa-linkedin"></span></a></li>
                                    <li><a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank" className="p-2"><span className="fa fa-instagram"></span></a></li>
                                </ul>

                            </div>
                            <div className="col-md-6 mb-5">
                                <div className="mb-5">
                                    <h3>Графік роботи:</h3>
                                    <p><strong className="d-block">Понеділок - Неділя</strong> 8:00 - 20:00</p>
                                </div>
                                <div>
                                    <h3>Контактна інформація</h3>
                                    <ul className="list-unstyled footer-link">
                                        <li className="d-block">
                                            <span className="d-block">Адреса:</span>
                                            <span className="text-white">вул. Соборна, 16, Рівне, Рівненська область, 33000</span></li>
                                        <li className="d-block"><span className="d-block">Telephone:</span><span className="text-white">+38 (067) 557-87-04</span></li>
                                        <li className="d-block"><span className="d-block">Email:</span><span className="text-white">info@gmail.com</span></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-md-3 mb-5">
                                <h3>Quick Links</h3>
                                <ul className="list-unstyled footer-link">
                                    <li><Link to="/">About</Link></li>
                                    <li><Link to="/">Terms of Use</Link></li>
                                    <li><Link to="/">Disclaimers</Link></li>
                                    <li><Link to="/">Contact</Link></li>
                                </ul>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-12 text-md-center text-left">
                                <p>
                                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Готуємо з <i className="fa fa-heart" aria-hidden="true"></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
</React.Fragment>);
}
export default Footer;