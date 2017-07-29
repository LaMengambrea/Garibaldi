import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileNavBar from '../../partials/nav-bars/profile-nav-bar/ProfileNavBar';
import {connect} from 'react-redux'
import * as constants from '../../../redux/constants'
import NotificationComponent from '../../alerts/notifications/NotificationComponent'
import ArtCardOverlay from '../../partials/gallery-page/art-card-overlay/ArtCardOverlay'
import ArtistCardOverlay from '../../partials/artist-page/artist-card-overlay/ArtistCardOverlay'
import FullImageOverlay from '../../partials/gallery-page/full-image-overlay/FullImageOverlay'
import MainNavBar from '../../partials/nav-bars/main-nav-bar/MainNavBar'
import FloatingBar from '../../partials/floating-bar/FloatingBar'
import {handleError} from '../../../utils/errorHandling'
import apiRoutes from '../../../utils/services/apiRoutes'

import axios from 'axios'

require('../../../Main.css');

class BaseLayout extends Component {
  artistProfileClick() {
      let {currentUser, receiveCurrentArtist, showArtistOverlayRecieved, addNotification, loadingArtistDetail, clearAllNotifications} = this.props
      clearAllNotifications()
      showArtistOverlayRecieved(true)
      loadingArtistDetail(true)
      axios.get(`${apiRoutes.getServiceUrl()}/api/Artists/${currentUser.ownerId}/getArtistDetail`)
      .then(function (response) {
          receiveCurrentArtist(response.data)
          loadingArtistDetail(false)
      })
      .catch(function (error) {
          addNotification(error.response.data.error)
          loadingArtistDetail(false)
      })
  }

  render() {
    return (
      <div className="BaseLayout container-fluid degraded-container">
        <FloatingBar />
        <ArtCardOverlay />
        <ArtistCardOverlay />
        <FullImageOverlay />
        <ProfileNavBar user={this.props.currentUser}/>
        <MainNavBar user={this.props.currentUser} artistProfileClick={this.artistProfileClick.bind(this)}/>
        <div className="row"><NotificationComponent/></div>
        <div className="row">{this.props.children}</div>
      </div>
    );
  }
}

BaseLayout.displayName = 'BaseLayout'

BaseLayout.propTypes = {
  currentUser: PropTypes.object,
  receiveCurrentArtist: PropTypes.func,
  showArtistOverlayRecieved: PropTypes.func,
  addNotification: PropTypes.func,
  loadingArtistDetail: PropTypes.func,
  clearAllNotifications: PropTypes.func
};

export const mapStateToProps = ({currentUser}) => ({
  currentUser
})

export const mapDispatchToProps = dispatch => ({
  receiveCurrentArtist: artist => dispatch({type: constants.CURRENT_ARTIST_RECEIVED, artist}),
  showArtistOverlayRecieved: show => dispatch({type: constants.SHOW_ARTIST_OVERLAY, show}),
  addNotification: notification => handleError(dispatch, notification),
  loadingArtistDetail: updatingCurrentArtist => dispatch({type: constants.UPDATING_CURRENT_ARTIST, updatingCurrentArtist}),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS})
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)