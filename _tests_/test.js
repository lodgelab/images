import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import App from '../client/src/components/App.jsx';
import HeroImages from '../client/src/components/HeroImages.jsx';
import PopGallery from '../client/src/components/PopGallery.jsx';
import TinyGallery from '../client/src/components/TinyGallery.jsx';


Enzyme.configure({ adapter: new Adapter() });


jest.mock('axios', () => {
  const exampleImages = [{
    _id: '5d65a0425fbc894556233dcd', imageId: 1, imagePlaceNumber: 1, imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/100.jpg', imageDescription: 'Intelligentsia kale chips hammock asymmetrical bespoke seitan health goth man bun freegan.',
  }];

  return {
    get: jest.fn(() => Promise.resolve(exampleImages)),
  };
});


// App functionality and rendering
describe('Testing for proper rendering and functionality of App component', () => {
  const wrapper = mount(<App />);
  it('Should render app', () => {
    expect(wrapper.exists()).toBe(true);
  });


  it('componentDidMount should fetch images for one listing', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().componentDidMount().then(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(wrapper.state()).toHaveProperty('images', exampleImages);
      done();
    });
  });

  it('changeCurrentPhoto function should change the state', () => {
    const spy = jest.spyOn(wrapper.instance(), 'changeCurrentPhoto');
    wrapper.instance().changeCurrentPhoto('status');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('onToggle function should change the state', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onToggle');
    wrapper.instance().onToggle('status');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('when show images button is clicked onToggle should be triggered', () => {
    const onToggle = jest.fn();
    const button = shallow((<button className="show-images" onClick={onToggle}>Show Images</button>));
    button.find('button').simulate('click');
    expect(onToggle.mock.calls.length).toEqual(1);
  });
});


// testing for HeroImages functionality and rendering
describe('Testing for proper rendering and functionality of HeroImages component', () => {
  const baseProps = {
    changeCurrentPhoto: jest.fn(),
    imagesForHero: [
      {
        imageDescription: 'Intelligentsia kale chips hammock asymmetrical bespoke seitan health goth man bun freegan.',
        imageId: 1,
        imagePlaceNumber: 1,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/100.jpg',
        _id: '5d65a0425fbc894556233dcd',
      },
      {
        imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
        imageId: 2,
        imagePlaceNumber: 2,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/60.jpg',
        _id: '5d65a0425fbc894556233dce',
      },
      {
        imageDescription: 'Kombucha tousled tofu, cred tbh swag poke.',
        imageId: 3,
        imagePlaceNumber: 3,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/64.jpg',
        _id: '5d65a0425fbc894556233dcf',
      },
      {
        imageDescription: 'Banjo activated charcoal cred meggings franzen. Chia austin wolf, trust fund artisan franzen normcore direct trade succulents iPhone plaid.',
        imageId: 4,
        imagePlaceNumber: 4,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/90.jpg',
        _id: '5d65a0425fbc894556233dd0',
      },
      {
        imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
        imageId: 5,
        imagePlaceNumber: 5,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/6.jpg',
        _id: '5d65a0425fbc894556233dd1',
      },
    ],
    onToggle: jest.fn(),
  };

  const renderedComponent = shallow(<HeroImages {...baseProps} />);
  it('HeroImages component should render', () => {
    const wrapper = mount(<HeroImages {...baseProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('when an image is clicked the function changeCurrentPhoto should be triggered', () => {
    const changeCurrentPhoto = jest.fn();
    const wrapper = mount(
      <HeroImages
        {...baseProps}
        changeCurrentPhoto={changeCurrentPhoto}
      />,
    );
    wrapper.find('HeaderImg').simulate('click');
    wrapper.find('Img').at(0).simulate('click');
    wrapper.find('Img').at(1).simulate('click');
    wrapper.find('Img').at(2).simulate('click');
    wrapper.find('Img').at(3).simulate('click');
    expect(changeCurrentPhoto).toBeCalled();
    expect(changeCurrentPhoto.mock.calls.length).toEqual(5);
  });
});


// PopGallery rendring and fucntionality
describe('Testing for proper rendering and functionality of PopGallery component', () => {
  const baseProps = {
    changeCurrentPhoto: jest.fn(),
    currentPhoto: {
      imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
      imageId: 2,
      imagePlaceNumber: 2,
      imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/60.jpg',
      _id: '5d65a0425fbc894556233dce',
    },
    images: [
      {
        imageDescription: 'Intelligentsia kale chips hammock asymmetrical bespoke seitan health goth man bun freegan.',
        imageId: 1,
        imagePlaceNumber: 1,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/100.jpg',
        _id: '5d65a0425fbc894556233dcd',
      },
      {
        imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
        imageId: 2,
        imagePlaceNumber: 2,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/60.jpg',
        _id: '5d65a0425fbc894556233dce',
      },
      {
        imageDescription: 'Kombucha tousled tofu, cred tbh swag poke.',
        imageId: 3,
        imagePlaceNumber: 3,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/64.jpg',
        _id: '5d65a0425fbc894556233dcf',
      },
      {
        imageDescription: 'Banjo activated charcoal cred meggings franzen. Chia austin wolf, trust fund artisan franzen normcore direct trade succulents iPhone plaid.',
        imageId: 4,
        imagePlaceNumber: 4,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/90.jpg',
        _id: '5d65a0425fbc894556233dd0',
      },
      {
        imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
        imageId: 5,
        imagePlaceNumber: 5,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/6.jpg',
        _id: '5d65a0425fbc894556233dd1',
      },
    ],
    onToggle: jest.fn(),
    backButtonImage: {
      imageDescription: 'Intelligentsia kale chips hammock asymmetrical bespoke seitan health goth man bun freegan.',
      imageId: 1,
      imagePlaceNumber: 1,
      imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/100.jpg',
      _id: '5d65a0425fbc894556233dcd',
    },
    nextButtonImage: {
      imageDescription: 'Kombucha tousled tofu, cred tbh swag poke.',
      imageId: 3,
      imagePlaceNumber: 3,
      imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/64.jpg',
      _id: '5d65a0425fbc894556233dcf',
    },
  };
  const renderedComponent = shallow(<PopGallery {...baseProps} />);

  it('test to see if PopGallery has rendered', () => {
    expect(renderedComponent.exists()).toBe(true);
  });

  it('test to see if  description div has rendered', () => {
    expect(renderedComponent.find('.description').length).toBeGreaterThanOrEqual(1);
  });

  it('test to see if TinyGallery component has rendered', () => {
    expect(renderedComponent.find('.tiny-gallery').length).toBe(1);
  });

  it('test to see if image tracker div has rendered', () => {
    expect(renderedComponent.find('.image-tracker').length).toBeGreaterThanOrEqual(1);
  });

  it('the next button is clicked it should move to the next photo in the gallery', () => {
    const changeCurrentPhoto = jest.fn();
    const renderedComponent = mount(
      <PopGallery
        {...baseProps}
        changeCurrentPhoto={changeCurrentPhoto}
      />,
    );
    renderedComponent.find('.nextButton').simulate('click');
    expect(changeCurrentPhoto).toHaveBeenCalled();
  });

  it('when the back button is clicked it should move tback one photo in the gallery', () => {
    const changeCurrentPhoto = jest.fn();
    const renderedComponent = mount(
      <PopGallery
        {...baseProps}
        changeCurrentPhoto={changeCurrentPhoto}
      />,
    );
    renderedComponent.find('.backButton').simulate('click');
    expect(changeCurrentPhoto).toHaveBeenCalled();
  });

  it('when x button is clicked onToggle should be triggered', () => {
    const onToggle = jest.fn();
    const renderedComponent = mount(
      <PopGallery
        {...baseProps}
        onToggle={onToggle}
      />,
    );
    renderedComponent.find('.x-button').simulate('click');
    expect(onToggle).toHaveBeenCalled();
  });
});


// TinyGallery functionailty and rendering
describe('Testing for proper rendering and functionality of TinyGallery component', () => {
  const baseProps = {
    changeCurrentPhoto: jest.fn(),
    images: [
      {
        imageDescription: 'Intelligentsia kale chips hammock asymmetrical bespoke seitan health goth man bun freegan.',
        imageId: 1,
        imagePlaceNumber: 1,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/100.jpg',
        _id: '5d65a0425fbc894556233dcd',
      },
      {
        imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
        imageId: 2,
        imagePlaceNumber: 2,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/60.jpg',
        _id: '5d65a0425fbc894556233dce',
      },
      {
        imageDescription: 'Kombucha tousled tofu, cred tbh swag poke.',
        imageId: 3,
        imagePlaceNumber: 3,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/64.jpg',
        _id: '5d65a0425fbc894556233dcf',
      },
      {
        imageDescription: 'Banjo activated charcoal cred meggings franzen. Chia austin wolf, trust fund artisan franzen normcore direct trade succulents iPhone plaid.',
        imageId: 4,
        imagePlaceNumber: 4,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/90.jpg',
        _id: '5d65a0425fbc894556233dd0',
      },
      {
        imageDescription: 'Neutra whatever raclette la croix marfa microdosing swag skateboard prism freegan paleo meh authentic listicle blog.',
        imageId: 5,
        imagePlaceNumber: 5,
        imageSource: 'https://images-for-fec-project.s3-us-west-1.amazonaws.com/6.jpg',
        _id: '5d65a0425fbc894556233dd1',
      },
    ],
  };

  const renderedComponent = shallow(<TinyGallery {...baseProps} />);
  it('test to see if TinyGallery has rendered well', () => {
    expect(renderedComponent.exists()).toBe(true);
  });

  it('test to see if images have description div', () => {
    expect(renderedComponent.find('.tiny-image').length).toBeGreaterThanOrEqual(5);
  });

  it('when an image is clicked the TinyImages, it will jump to that specific image ', () => {
    const changeCurrentPhoto = jest.fn();
    const renderedComponent = mount(
      <TinyGallery
        {...baseProps}
        changeCurrentPhoto={changeCurrentPhoto}
      />,
    );
    renderedComponent.find('.tiny-image').first().simulate('click');
    expect(changeCurrentPhoto).toHaveReturned();
    expect(changeCurrentPhoto.mock.calls.length).toEqual(1);
  });
});
