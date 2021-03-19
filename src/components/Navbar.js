import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import youtube from '../img/social/youtube.svg'
import logo from '../img/logo.svg'
import useSiteMetadata from './SiteMetadata'

const Navbar = () => {
  const { facebook: facebookUrl, instagram: instagramUrl, youtube: youtubeUrl } = useSiteMetadata();

  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState('');

  useEffect(() => {
    setNavBarActiveClass(active ? 'is-active' : '');
  }, [active]);

  const toggleHamburger = () => setActive(!active);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Max Terzakis" className="logo" style={{ width: '300px' }} />
          </Link>
          {/* Hamburger menu */}
          <div
            role="button"
            tabIndex={0}
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onKeyDown={toggleHamburger}
            onClick={toggleHamburger}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          id="navMenu"
          className={`navbar-menu ${navBarActiveClass}`}
        >
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
              </Link>
            <Link className="navbar-item" to="/music">
              Music
              </Link>
            <Link className="navbar-item" to="/events">
              Events
              </Link>
            <Link className="navbar-item" to="/contact">
              Contact
              </Link>
          </div>
          {(facebookUrl || instagramUrl || youtubeUrl) && <div className="navbar-end has-text-centered">
            {facebookUrl && <a className="navbar-item" title="facebook" href={facebookUrl} target="_blank" rel="noreferrer">
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: '2em', height: '2em' }}
              />
            </a>}
            {instagramUrl && <a className="navbar-item" title="instagram" href={instagramUrl} target="_blank" rel="noreferrer">
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: '2em', height: '2em' }}
              />
            </a>}
            {youtubeUrl && <a className="navbar-item" title="youtube" href={youtubeUrl} target="_blank" rel="noreferrer">
              <img
                src={youtube}
                alt="youtube"
                style={{ width: '2em', height: '2em' }}
              />
            </a>}
          </div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
