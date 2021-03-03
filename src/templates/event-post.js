import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const EventPostTemplate = ({
  content,
  contentComponent,
  title,
  date,
  venue,
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
            <h3>{venue} - {date}</h3>
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
  date: PropTypes.string,
  venue: PropTypes.string,
  helmet: PropTypes.object,
}

const EventPost = ({ data }) => {
  const { markdownRemark: post } = data

  const { description, title, venue, date } = post.frontmatter;

  return (
    <Layout>
      <EventPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={description}
        venue={venue}
        date={date}
        helmet={
          <Helmet titleTemplate="Event | %s">
            <title>{`${title}`}</title>
            {/* TODO SEO */}
            {/* <meta
              name="description"
              content={`${description}`}
            /> */}
          </Helmet>
        }
        title={title}
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
        venue
      }
    }
  }
`
