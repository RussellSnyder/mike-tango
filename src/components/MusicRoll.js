import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class MusicRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: musics } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {musics &&
          musics.map(({ node: music }) => (
            <div className="is-parent column is-6" key={music.id}>
              <article
                className={`blog-list-item tile is-child box notification`}
              >
                <header>
                  {music.frontmatter.image ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: music.frontmatter.image,
                          alt: `image for music ${music.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={music.fields.slug}
                    >
                      {music.frontmatter.title}
                    </Link>
                    <span> {music.frontmatter.short} </span>
                    <span className="subtitle is-size-5 is-block">
                      {music.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {music.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={music.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

MusicRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query MusicRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "music-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                image {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MusicRoll data={data} count={count} />}
  />
)
