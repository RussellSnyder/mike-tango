import React from 'react'
import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import youtube from '../img/social/youtube.svg'
import useSiteMetadata from './SiteMetadata'

const Footer = () => {
  const { facebook: facebookUrl, instagram: instagramUrl, youtube: youtubeUrl } = useSiteMetadata();
  return (
    <footer className="footer has-background-black has-text-white-ter">
      <div className="has-text-centered">
        <img
          src={logo}
          alt="Musician Max Terzakis"
          style={{ width: '50em', height: '5em' }}
        />
      </div>
      {(facebookUrl || instagramUrl || youtubeUrl) && <div className="content has-text-centered" style={{ paddingBottom: '1.5em' }}>
        <div className="column is-12 social">
          {facebookUrl && <a title="facebook" href={facebookUrl} target="_blank" rel="noreferrer">
            <img
              src={facebook}
              alt="Facebook"
              style={{ width: '1.2em', height: '1.2em' }}
            />
          </a>}
          {instagramUrl && <a title="instagram" href={instagramUrl} target="_blank" rel="noreferrer">
            <img
              src={instagram}
              alt="Instagram"
              style={{ width: '1.2em', height: '1.2em' }}
            />
          </a>}
          {youtubeUrl && <a title="youtube" href={youtubeUrl} target="_blank" rel="noreferrer">
            <img
              src={youtube}
              alt="youtube"
              style={{ width: '1.2em', height: '1.2em' }}
            />
          </a>}
        </div>
      </div>}
    </footer>
  )
}

export default Footer
