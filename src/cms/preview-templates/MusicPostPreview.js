import React from 'react'
import PropTypes from 'prop-types'
import { MusicPostTemplate } from '../../templates/music-post'

const MusicPostPreview = ({ entry, widgetFor }) => {
  return (
    <MusicPostTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

MusicPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default MusicPostPreview
