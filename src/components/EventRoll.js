import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class EventRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: events } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {events &&
          events.map(({ node: event }) => (
            <div className="is-parent column is-12" key={event.id}>
              <article
                className={`event-list-item tile is-child box notification`}
              >
                <header className="event-header">
                  <div className="left">
                    <h4 className="event-title">
                      {event.frontmatter.title}
                    </h4>
                  </div>
                  <div className="right">  
                    <h5 className="event-venue">
                      {event.frontmatter.venue}
                    </h5>
                    <h5 className="event-date">
                      {event.frontmatter.date}
                    </h5>
                  </div>
                </header>
                <p className="excerpt">
                  {/* {music.recording} */}
                  {event.excerpt}...&nbsp;
                  <Link to={event.fields.slug}>
                    read more
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

EventRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query EventRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "event-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 120)
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                title
                date(formatString: "MMMM DD, YYYY")
                recording {
                  publicURL
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <EventRoll data={data} count={count} />}
  />
)
