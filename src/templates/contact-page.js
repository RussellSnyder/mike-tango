import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { navigate } from 'gatsby-link'
import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export const ContactPageTemplate = ({ top }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState("");

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleMessageChange = (e) => setMessage(e.target.value)
  const handleBotFieldChange = (e) => setBotField(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contact',
        name,
        email,
        message,
      })
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <HTMLContent content={top} />
          <br/>
          <form
            name="contact"
            method="post"
            action="/contact/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" value={botField} onChange={handleBotFieldChange} />
              </label>
            </div>
            <div className="field">
              <label className="label" htmlFor={'name'}>
                Your name
                  </label>
              <div className="control">
                <input
                  className="input"
                  type={'text'}
                  name={'name'}
                  value={name}
                  onChange={handleNameChange}
                  id={'name'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor={'email'}>
                Email
                  </label>
              <div className="control">
                <input
                  className="input"
                  type={'email'}
                  name={'email'}
                  value={email}
                  onChange={handleEmailChange}
                  id={'email'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor={'message'}>
                Message
                  </label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={message}
                  name={'message'}
                  onChange={handleMessageChange}
                  id={'message'}
                  required={true}
                />
              </div>
            </div>
            <div className="field">
              <button className="button is-link" type="submit">
                Send
                  </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

ContactPageTemplate.propTypes = {
  content: PropTypes.string,
}

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate top={post.html} />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`
