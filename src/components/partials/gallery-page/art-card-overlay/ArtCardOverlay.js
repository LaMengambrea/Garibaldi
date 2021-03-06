import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ArtCard from '../art-card/ArtCard'
import LoaderComponent from '../../../../components/ui/loader/LoaderComponent'
require('../../../../Main.css')

export default class ArtCardOverlay extends Component {
    toggleOverlay(showArtOverlayRecieved) {
        showArtOverlayRecieved(false)
    }

    render() {
        let {showArtOverlay, showArtOverlayRecieved, updatingCurrentArt} = this.props
        return (showArtOverlay ?
        <div className="Overlay">
            <a className="Closebtn" onClick={() => this.toggleOverlay(showArtOverlayRecieved)}>&times;</a>
            <div className="Overlay-content">
                {
                    updatingCurrentArt
                    ? <div className="marginTop"><center><LoaderComponent/></center></div>
                    : <ArtCard {...this.props}/>
                }
            </div>
        </div> : null);
    }
}

ArtCardOverlay.displayName = 'ArtCardOverlay'

ArtCardOverlay.propTypes = {
  showArtOverlay: PropTypes.bool,
  showArtOverlayRecieved: PropTypes.func,
  updatingCurrentArt: PropTypes.bool
}