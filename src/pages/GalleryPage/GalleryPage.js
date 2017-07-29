import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as constants from '../../redux/constants'
import {connect} from 'react-redux'
import Mosaic from '../../components/partials/mosaic/Mosaic'
import ArtCard from '../../components/partials/gallery-page/art-card/ArtCard'
import {handleError, ERROR_CODES} from '../../utils/errorHandling'
import LoaderComponent from '../../components/ui/loader/LoaderComponent'
import axios from 'axios'
import {MosaicTypes} from '../../utils/constants/MosaicTypes'
import apiRoutes from '../../utils/services/apiRoutes'
import './GalleryPage.css'

class GalleryPage extends Component {
    getArtDetail(cardId, receiveCurrentArt, addNotification, loadingArtDetail) {
      loadingArtDetail(true)
      axios.get(`${apiRoutes.getServiceUrl()}/api/ArtPieces/${cardId}/getArtPieceDetail`)
      .then(function (response) {
          receiveCurrentArt(response.data)
          loadingArtDetail(false)
      })
      .catch(function (error) {
          addNotification(error.response.data.error)
          loadingArtDetail(false)
      })
    }

    componentWillMount() {
        let {clearAllNotifications, receiveArtGallery, receiveCurrentArt, addNotification, currentUser, loadingGallery, loadingArtDetail} = this.props
        let getArtDetail = this.getArtDetail
        clearAllNotifications()
        loadingGallery(true)
        
        axios.get(`${apiRoutes.getServiceUrl()}/api/ArtPieces/mosaic`, {params: {credential: currentUser}})
        .then(function (response) {
          if(response.data.length > 0) {
            getArtDetail(response.data[0].id, receiveCurrentArt, addNotification, loadingArtDetail)
            receiveArtGallery(response.data);
            loadingGallery(false)
          } else {
            addNotification({code: ERROR_CODES.NO_RESULTS_FOUND.code})
            loadingGallery(false)
        }
        })
        .catch(function (error) {
          addNotification(error.response.data.error)
          loadingGallery(false)
        })
    }

    render() {
        return (
        <div className="col-xs-12 col-md-12 GalleryPage">
            <div className="row">
                <div className="col-xs-12 col-md-8">
                    <div className="row">
                        {
                            this.props.updatingArtGallery 
                            ? <div className="marginTop"><center><LoaderComponent/></center></div>
                            : <Mosaic cardList={this.props.artGallery} mosaicType={MosaicTypes.ART}/>
                        }
                    </div>
                </div>
                <div className="col-xs-0 col-md-4 ArtDetailSection">
                    <div className="row">
                        {
                            this.props.updatingCurrentArt
                            ? <div className="marginTop"><center><LoaderComponent/></center></div>
                            : Object.getOwnPropertyNames(this.props.currentArt).length > 0 ? <ArtCard 
                                                                                                currentArt={this.props.currentArt} 
                                                                                                receiveCurrentArt={this.props.receiveCurrentArt}
                                                                                                showFullImageOverlayRecieved={this.props.showFullImageOverlayRecieved}/> : null
                        }
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

GalleryPage.displayName = 'GalleryPage'

GalleryPage.propTypes = {
  artGallery: PropTypes.array,
  currentArt: PropTypes.object,
  updatingArtGallery: PropTypes.bool,
  receiveArtGallery: PropTypes.func,
  receiveCurrentArt: PropTypes.func,
  addNotification: PropTypes.func,
  clearAllNotifications: PropTypes.func,
  loadingGallery: PropTypes.func,
  loadingArtDetail: PropTypes.func,
  updatingCurrentArt: PropTypes.bool,
  showFullImageOverlayRecieved: PropTypes.func
}

export const mapStateToProps = ({artGallery, currentArt, currentUser, updatingArtGallery, updatingCurrentArt}) => ({
  artGallery, currentArt, currentUser, updatingArtGallery, updatingCurrentArt
})

export const mapDispatchToProps = dispatch => ({
  receiveArtGallery: artGallery => dispatch({type: constants.ART_GALLERY_RECIEVED, artGallery}),
  receiveCurrentArt: art => dispatch({type: constants.CURRENT_ART_RECEIVED, art}),
  addNotification: notification => handleError(dispatch, notification),
  clearAllNotifications: () => dispatch({type: constants.CLEAR_ALL_NOTIFICATIONS}),
  loadingGallery: updatingArtGallery => dispatch({type: constants.UPDATING_ART_GALLERY, updatingArtGallery}),
  loadingArtDetail: updatingCurrentArt => dispatch({type: constants.UPDATING_CURRENT_ART, updatingCurrentArt}),
  showFullImageOverlayRecieved: show => dispatch({type: constants.SHOW_FULL_IMAGE_OVERLAY, show})
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)