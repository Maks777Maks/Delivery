import React, { Component } from 'react';
import ClientNavbar from "../../../layouts/clientLayout/clientNavbar";
import dishes_1 from '../../../assets/img/dishes_1.jpg';
import hero_1 from '../../../assets/img/hero_1.jpg';
import hero_2 from '../../../assets/img/hero_2.jpg';
import dishes_4 from '../../../assets/img/dishes_4.jpg';
import dishes_2 from '../../../assets/img/dishes_2.jpg';
import dishes_3 from '../../../assets/img/dishes_3.jpg';
import firstDish from '../../../assets/img/firstDish.jpg';
import secondDish from '../../../assets/img/secondDish.jpg';
import dessert from '../../../assets/img/dessert.jpg';
import cocktail from '../../../assets/img/cocktail.jpg';
import { Link } from 'react-router-dom';
import '../scss/style.scss';
class HomePage extends Component {
    state = { 
      randomMenuPhoto:[] 
    }
    componentWillReceiveProps = (nextProps) => { //- Binding    
      console.log(nextProps);
      this.setState({
        randomMenuPhoto: nextProps.randomMenuPhotoReducer
      });
    }
    render() { 
        const content = (
            <React.Fragment>
                 <ClientNavbar/>
    <section className="home-slider owl-carousel">
      <div className="slider-item" style={{backgroundImage: "url(" + hero_1 + ")"}}>
        
        <div className="container">
          <div className="row slider-text align-items-center justify-content-center">
            <div className="col-md-8 text-center col-sm-12 ">
              <h1>Моментальна доставка</h1>
              <p className="mb-5">Наші кур'єри зроблять все мжливе і неможливе щоб доставити їжу якнаймога швидше.</p>
            </div>
          </div>
        </div>

      </div>
      <div className="slider-item" style={{backgroundImage: "url(" + hero_2 + ")"}}>
        <div className="container">
          <div className="row slider-text align-items-center justify-content-center">
            <div className="col-md-8 text-center col-sm-12 ">
              <h1>Різноманітні страви</h1>
              <p className="mb-5">На ваш вибір представлено велику кількість страв різних кухонь.</p>
            </div>
          </div>
        </div>
        
      </div>

    </section>
    
    <section className="section bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center" style={{ backgroundImage: "url(" + firstDish + ")"}}>
            <span className="flaticon-cheers display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Перші страви</h4>
            <p className="text-border text-black">Рідкі перші страви - це дуже корисно для організму людини. Адже наш організм щодня потребує певну дозу рідини.</p>
          </div>
          <div></div>
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center" style={{backgroundImage: "url(" + secondDish + ")"}}>
            <span className="flaticon-fish display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Другі страви</h4>
            <p className="text-border text-black">Другі страви - прості, складні і надзвичайно смачні, Повноцінна і ґрунтовна трапеза, денна або вечірня, неможлива без других страв.</p>
          </div>
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center" style={{ backgroundImage: "url(" + dessert + ")"}}>
            <span className="flaticon-coffee-cup display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Десерти</h4>
            <p className="text-border text-black">Десерти - це не просто солодка страва, це чудовий завершальний акорд в будь-якій трапезі, свято насолоди і захвату.</p>
          </div>
          <div className="col-md-6 mb-4 mb-lg-0 col-lg-3 text-center" style={{ backgroundImage: "url(" + cocktail + ")"}}>
            <span className="flaticon-salad display-4 text-black d-block mb-4"></span>
            <h4 className="mb-4 text-primary">Напої</h4>
            <p className="text-border text-black">Твоя спрага не встоїть перед нашими холодними та гарячими напоями.</p>
          </div>
        </div>
      </div>
    </section>
    
    <section className="section bg-light ">

      <div className="clearfix mb-5 pb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center heading-wrap">
              <h2>Наше меню</h2>
              <span className="back-text-dark">Меню</span>
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
                <h3>Салат «Цезар» на грилі, реґіно</h3>
                <p>Популярний салат, одна з найвідоміших страв північноамериканської кухні.</p>
                <p className="text-primary h3">₴370.00</p>
              </div>
              
            </div>

            <div className="sched d-block d-lg-flex">
              <div className="bg-image" style={{backgroundImage: "url(" + dishes_1 + ")"}}></div>
              <div className="text">
                <h3>Пряні кальмари та квасоля</h3>
                <p>Встигни насолодитися цією стравою з кальмарами та квасолею.</p>
                <p className="text-primary h3">₴320.00</p>
                
              </div>
              
            </div>

          </div>

          <div className="col-md-6">
            <div className="sched d-block d-lg-flex">
              <div className="bg-image order-2" style={{backgroundImage: "url(" + dishes_2 + ")"}}></div>
              <div className="text order-1">
                <h3>Бекон з креветками</h3>
                <p>Закуска креветками з беконом, яка гарантує неймовірні враження.</p>
                <p className="text-primary h3">₴480.00</p>
                
              </div>
              
            </div>

            <div className="sched d-block d-lg-flex">
              <div className="bg-image" style={{backgroundImage: "url(" + dishes_3 + ")"}}></div>
              <div className="text">
                <h3>Філе тунця, медово-імбирний соус</h3>
                <p>Тунець з соєвим імбирним соусом з лайма - це здорове і дуже просте блюдо.</p>
                <p className="text-primary h3">₴420.00</p>
                
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
              <h2>Відгуки</h2>
              <span className="back-text">Відгуки</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <blockquote className="testimonial">
              <p>&ldquo; Дуже величезне дякую Вам, все дуже смачно, заказували доставку, привезли вчасно на вказаний час, гаряче, і видно, що страви готувались перед виїздом. &rdquo;</p>
              <div className="d-flex author">
                <img src="img/person_1.jpg" alt="" className="mr-4"/>
                <div className="author-info">
                  <h4>Оксана </h4>
                  
                </div>
              </div>  
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="testimonial">
              <p>&ldquo; Дуже смачно готують. Беру не один рік. Дуже швидко приходить замовлення. Багато вибору. Я довіряю цій компанії і раджу вам. &rdquo;</p>
              <div className="d-flex author">
                <img src="img/person_2.jpg" alt="" className="mr-4"/>
                <div className="author-info">
                  <h4>Ольга</h4>
                  
                </div>
              </div>  
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="testimonial">
              <p>&ldquo; Цей сервіс відкрив для себе випадково і дуже радий цьому. Хороші ціни, дуже смачна їжа, швидка доставка, зручний сайт для замовлення. Дуже зручно, що можна вибрати замовлення на певний час. І їжа приїжає ще гарячою! Сервіс просто супер! Так тримати! &rdquo;</p>
              <div className="d-flex author">
                <img src="img/person_3.jpg" alt="" className="mr-4"/>
                <div className="author-info">
                  <h4>Дмитро</h4>
                  
                </div>
              </div>  
            </blockquote>
          </div>
        </div>
      </div>
    </section>
    
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4 mb-5">
            <h3>Про нас</h3>
            <p className="mb-5">Мінімальний час доставки, зручна оплата, великий вибір страв.</p>
 

          </div>
          <div className="col-md-2 mb-5">
            <div className="mb-5">
              <h3>Години роботи</h3>
              <p><strong className="d-block">Понеділок-Неділя</strong> З 10:00 по 22:00 </p>
            </div>
       
          </div>
          <div>
              <h3>Зв'язок з нами</h3>
              <ul className="list-unstyled footer-link">
                <li className="d-block">
                  <span className="d-block">Адреса:</span>
                  <span className="text-white">вул. Соборна 1, м. Рівне, Україна</span></li>
                <li className="d-block"><span className="d-block">Номер телефону:</span><span className="text-white">+380930003322</span></li>
                <li className="d-block"><span className="d-block">Електронна пошта:</span><span className="text-white">food.delivery.rivne@gmail.com</span></li>
              </ul>
            </div>
          <div className="col-md-3 mb-5">
            <h3>Важливі посилання</h3>
            <ul className="list-unstyled footer-link">
              <li><a href="#">Про нас</a></li>
              <li><a href="#">Правила використання</a></li>
              <li><a href="#">Відмова від відповідальності</a></li>
              <li><a href="#">Зв'язок</a></li>
            </ul>
          </div>
          <div className="col-md-3">
          
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-md-center text-left">
            <p>
        Copyright 2020 &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
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