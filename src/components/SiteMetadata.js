import { graphql, useStaticQuery } from 'gatsby'

const useSiteMetadata = () => {
  const { site, markdownRemark } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            keywords
            image
          }
        }
        markdownRemark(frontmatter: { id: { eq: "site-info" } }) {
          frontmatter {
            seotitle
            seodescription
            seokeywords
            seoimage {
              childImageSharp {
                fluid(maxWidth: 500, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            facebook
            instagram
            youtube
          }
        }    
      }
    `
  )
  
  const { seotitle, seodescription, seokeywords, seoimage } = markdownRemark.frontmatter;
  return {
    title: seotitle || site.title,
    description: seodescription || site.description,
    keywords: seokeywords || site.keywords,
    image: seoimage ? seoimage.childImageSharp.fluid.src : site.image,
  }
}

export default useSiteMetadata
