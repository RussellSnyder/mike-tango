import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const EventPostTemplate = ({
  content,
  contentComponent,
  title,
  description,
  helmet,
}) => {

  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

EventPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
}

const EventPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <EventPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        helmet={
          <Helmet titleTemplate="Event | %s">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

EventPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default EventPost

export const eventPageQuery = graphql`
  query EventPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        time
        location
      }
    }
  }
`
