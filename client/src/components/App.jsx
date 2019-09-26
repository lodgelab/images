import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeroImages from './HeroImages.jsx';
import PopGallery from './PopGallery.jsx';


const RalewayFont = styled.div`
font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif !important;
`;

class Images extends Component {
  constructor(props) {
    super(props);
    const constructURL = (imageid) => `https://mock-property-images.s3-us-west-1.amazonaws.com/activities/fun-${imageid}.jpeg`;
    const data = [{
      listingId: props.images,
      images: [],
    }];
    for (let i = 0; i < props.images.length; i += 1) {
      const image = {
        imageId: i + 1,
        imagePlaceNumber: i + 1,
        imageSource: constructURL(props.images[i].image_id),
        imageDescription: props.images[i].image_description,
      };
      data[0].images.push(image);
    }
    this.state = {
      images: data[0].images,
      imagesForHero: data[0].images.slice(0, 5),
      currentPhoto: data[0].images[0],
      imagesLength: data[0].images.length,
      // images: [],
      tinyGalleryImages: undefined,
      // imagesForHero: undefined,
      toggle: false,
      // currentPhoto: {},
      backButtonImage: {},
      nextButtonImage: {},
      // imagesLength: 0,
    };
    this.onToggle = this.onToggle.bind(this);
    this.changeCurrentPhoto = this.changeCurrentPhoto.bind(this);
  }

  onToggle() {
    const { toggle } = this.state;
    const currentToggle = toggle;
    this.setState({ toggle: !currentToggle });
  }

  backNextCounterFinder(current) {
    const currentPlaceNumber = current.imagePlaceNumber;
    const { images } = this.state;
    let back = images[currentPlaceNumber - 2];
    let count;
    let next = images[currentPlaceNumber];
    if (images[currentPlaceNumber - 2] === undefined) {
      back = images[images.length - 1];
      count = -1;
    } else if (images[currentPlaceNumber] === undefined) {
      [next] = images;
      count = -5;
    } else if (images[currentPlaceNumber - 3] === undefined) {
      count = -2;
    } else if (images[currentPlaceNumber + 1] === undefined) {
      count = -4;
    } else {
      count = -3;
    }
    this.setState({
      backButtonImage: back,
      nextButtonImage: next,
    });
    return count;
  }

  changeCurrentPhoto(current) {
    const currentPlaceNumber = current.imagePlaceNumber;
    const { images } = this.state;
    let counter = this.backNextCounterFinder(current);
    const newImagesArray = [];
    const arrayCreator = () => {
      // base case
      // if newImagesArray has a length of 5
      if (newImagesArray.length === 5) {
        // return nothing
        return;
      }
      // recursive case
      // push of images with the index of placement number to newImagesArray
      newImagesArray.push(images[currentPlaceNumber + counter]);
      // add one to counter
      counter++;
      // run function again
      arrayCreator();
    };

    arrayCreator();
    this.setState({
      currentPhoto: current,
      tinyGalleryImages: newImagesArray,
      toggle: true,
    });
  }

  render() {
    return (
      <RalewayFont>
        {this.state.imagesForHero && !this.state.toggle
        && (
        <HeroImages
          changeCurrentPhoto={this.changeCurrentPhoto}
          imagesForHero={this.state.imagesForHero}
          onToggle={this.onToggle}
        />
        )}
        {this.state.toggle
        && (
        <PopGallery
          changeCurrentPhoto={this.changeCurrentPhoto}
          currentPhoto={this.state.currentPhoto}
          tinyGalleryImages={this.state.tinyGalleryImages}
          onToggle={this.onToggle}
          backButtonImage={this.state.backButtonImage}
          nextButtonImage={this.state.nextButtonImage}
          imagesLength={this.state.imagesLength}
        />
        )}
      </RalewayFont>

    );
  }
}
export default Images;
