import React from 'react'
import PropTypes from 'prop-types'
import AudioPlayer from 'react-h5-audio-player';
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const MusicPostTemplate = ({
  content,
  contentComponent,
  title,
  date,
  recording,
  helmet,
}) => {

  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div style={{ display: 'flex', alignItems: 'center' }}
              className="is-justify-content-space-between">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <h4 className="date" style={{ textAlign: 'right' }}>
                {date}
              </h4>
            </div>
            <AudioPlayer src={`${recording}`}/>
            <br />
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

MusicPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
}

const MusicPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <MusicPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        recording={post.frontmatter.recording.publicURL}
        image={post.frontmatter.image}
        helmet={
          <Helmet titleTemplate="Music | %s">
            <title>{`${post.frontmatter.title}`}</title>
            {/* TODO SEO */}
            {/* <meta
              name="description"
              content={`${post.frontmatter.description}`}
            /> */}
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

MusicPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default MusicPost

export const musicPageQuery = graphql`
  query MusicPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        recording {
          publicURL
        }
        youtube
      }
    }
  }
`
