import React from 'react';
import PropTypes from 'prop-types';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

export function ImageCloud({
  alt,
  maxHeight,
  maxWidth,
  imageId = 'old_logo_rssqwk',
  ClassName,
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'cgabay',
    },
  });

  let myImage = cld.image(imageId);
  const isUrl =
    // eslint-disable-next-line no-useless-escape
    /^(?:http(s)?:\/\/)([\w.-])+(?:[\w\.-]+)+([\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.])+$/.test(
      imageId
    );
  if (isUrl || imageId === '') {
    imageId = 'logo-gold_tk2tzc';
    myImage = cld.image(imageId);
    maxWidth = 100;
    maxHeight = 250;
  }
  myImage.resize(thumbnail().width(200).height(200));

  return (
    myImage && (
      <AdvancedImage
        alt={alt}
        className={ClassName}
        cldImg={myImage}
        plugins={[responsive({ steps: 50 }), placeholder({ mode: 'blur' })]}
      />
    )
  );
}
ImageCloud.propsTypes = {
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  alt: PropTypes.string,
  imageId: PropTypes.element.isRequired,
  ClassName: PropTypes.string,
};
ImageCloud.defaultProps = {
  maxHeight: 300,
  maxWidth: 300,
  ClassName: ' ',
};
