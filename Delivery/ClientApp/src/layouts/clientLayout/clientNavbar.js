import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

const MyDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        tag="a"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
        Вид кухні
      </DropdownToggle>
      <DropdownMenu>
            <DropdownItem>1 Action</DropdownItem>
            <DropdownItem>2 Action</DropdownItem>
            <DropdownItem>3 Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default class ClientNavbar extends Component {
    render(){
        return (
            <React.Fragment>
            <header role="banner">
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container">
                            <Link className="navbar-brand" to="/">Доставка</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarsExample05">
                                <ul className="navbar-nav ml-auto pl-lg-5 pl-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/client/profile">ПРОФАЙЛ</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Всі страви</Link>
                                    </li>
                                    <li className="nav-item">
                                        <div  className="nav-link">
                                            <MyDropdown></MyDropdown>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Про нас</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" >Вхід</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register" >Реєстрація</Link>
                                    </li>
                                </ul>

                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item cta-btn">
                                        <Link className="nav-link" to="/">З'яжіться з нами</Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </header>
        </React.Fragment>
        );
    }
}