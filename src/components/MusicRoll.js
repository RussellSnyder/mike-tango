import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

class MusicRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: musics } = data.allMarkdownRemark

    console.log({musics})
    return (
      <div className="columns is-multiline">
        {musics &&
          musics.map(({ node: music }) => (
            <div className="is-parent column is-12" key={music.id}>
              <article
                className={`music-list-item tile is-child box notification`}
              >
                <header className="is-justify-content-space-between is-flex-direction-row">
                  <h4 className="post-meta">
                    {music.frontmatter.title}
                  </h4>
                  <span className="date">
                    {music.frontmatter.date}
                  </span>
                </header>
                <AudioPlayer
                  src={music.frontmatter.recording}
                  onPlay={e => console.log("onPlay")}
                  // other props here
                />
                <p>
                  {/* {music.recording} */}
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
                recording
                youtube
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <MusicRoll data={data} count={count} />}
  />
)
