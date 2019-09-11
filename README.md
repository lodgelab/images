# Images - Minctech

> Images module for a private lodging platform. Built with react and JavaScript. Supports interactive hero banner and gallery.
> Utilizes MongoDB and Mongoose for database management, express for server handling.
> Deployed with docker and AWS(EC2)

## Related Projects

  - https://github.com/minctech/
  - https://github.com/minctech/reservations
  - https://github.com/minctech/reviews

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Restful API](#API)

## Usage

> Hover over image an image on the hero banner to zoom in on that photo.
> Click on the view photos button to launch gallery that starts on the the first image of the hero banner.
> Click on any image on the hero banner to launch the gallery that starts at the selected image.
> In the gallery click >  to move to the next image.
> In the gallery click < to move back an image.
> In the image list in the gallery click on any photo to jump to it in the gallery.


## Requirements

- Node 10.15.3 or higher

## Development

### Installing Dependencies

From within the project directory:

```sh
npm install
npm run seed
npm run react-dev
npm run start (in a seperate bash window)
```

## API

### GET
> /api/listings/:listing/images

Response:
```json
[
    {
        "_id": "5d602d3c0eaedd182ef1032e",
        "listingId": 0,
        "images": [
            {
                "_id": "5d602d3c0eaedd182ef1032f",
                "imageId": 0,
                "imagePlaceNumber": 0,
                "imageSource": "https://images-for-fec-project.s3-us-west-1.amazonaws.com/67.jpg",
                "imageDescription": "Farm-to-table meh disrupt blog enamel pin gentrify slow-carb direct."
            },
            {
                "_id": "5d602d3c0eaedd182ef10330",
                "imageId": 1,
                "imagePlaceNumber": 1,
                "imageSource": "https://images-for-fec-project.s3-us-west-1.amazonaws.com/41.jpg",
                "imageDescription": "Helvetica mustache palo santo snackwave synth selfies vaporware."
            },
        ]
    }
]
```

### POST
> /api/listings/:listing/images

Request:
```json
FormData Object
```
### PUT
> /api/listings/:listing/images/:image

Request:
```json
FormData Object
```

### DELETE
> DELETE /api/listings/:listing/images/:image


