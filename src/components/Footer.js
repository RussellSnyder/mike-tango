import React from 'react'
import github from '../img/github-icon.svg'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="has-text-centered">
          <img
            src={logo}
            alt="Musician Max Terzakis"
            style={{ width: '50em', height: '5em' }}
          />
        </div>
        <div className="content has-text-centered">
          <div className="column is-12 social">
            <a title="facebook" href="https://facebook.com">
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: '1.2em', height: '1.2em' }}
              />
            </a>
            <a title="instagram" href="https://instagram.com">
              <img
                src={instagram}
                alt="Instagram"
                style={{ width: '1.2em', height: '1.2em' }}
              />
            </a>
          </div>
          <div className="column is-12 by-russell">
            Russell made this website
            <a
              href="https://github.com/RussellSnyder/mike-tango"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <img style={{ width: '1.2em' }} src={github} alt="Github" />
              </span>
            </a>

          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
