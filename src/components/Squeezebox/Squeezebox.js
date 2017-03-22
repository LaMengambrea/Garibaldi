import React, {Component} from 'react';
import Sliderbox from './Sliderbox';
import SqueezeNavControls from './SqueezeNavControls';
import SqueezeFrontCard from './SqueezeFrontCard';
import './css/reset.css';
import './css/style.css';
import './js/main.js';

export default class SqueezeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [{name: 'Artist 1', subtitle: 'Visual Design', profileImage: 'img/img.png'},
                    {name: 'Artist 2', subtitle: 'Sculptor', profileImage: 'img/img.png'},
                    {name: 'Artist 3', subtitle: 'Renovator', profileImage: 'img/img.png'},
                    {name: 'Artist 4', subtitle: 'Museum Master', profileImage: 'img/img.png'},
                    {name: 'Artist 5', subtitle: 'Gallery Gunman', profileImage: 'img/img.png'},
                    {name: 'Artist 6', subtitle: 'Designer', profileImage: 'img/img.png'},
                    {name: 'Artist 7', subtitle: 'Artic Artist', profileImage: 'img/img.png'},
                    ],
            selectedArtist: null,
            detailCardVisible: false
        };

        this.handleDetailCardClose = this.handleDetailCardClose.bind(this);
    }

    getSlider() {
        return (
                <ul className="cd-slider">
                    {this.state.artists.map((p, index) => {
                        var firstClassName = index === 0 ? 'current' : '';
                        return <Sliderbox key={index} initialClass={firstClassName} artist={p} />;
                    })}
                </ul>
        );
    }

    handleDetailCardClose(e) {
        e.preventDefault();
        // singleProjectContent.removeClass('is-visible');
        // this.setState({
        //     detailCardVisible: false
        // });
    }
    
    render() {
        const slider = this.getSlider();
        const selectedArtist = this.state.artists[0]; // TODO: Change to const {selectedArtist} = this.state;
        const detailCardCss = this.state.detailCardVisible ? 'cd-project-content is-visible' : 'cd-project-content';
        
        return (
            <div className="squeezeBox">
                <div className="cd-projects-wrapper">
                    {slider}
                    <SqueezeNavControls />
	            </div>
                <SqueezeFrontCard styles={detailCardCss} title={selectedArtist.name} onClickHandler={this.handleDetailCardClose} />
        </div>
        );
    }
}