import React from 'react';
import PropTypes from 'prop-types';
import { AdvancedImage, placeholder, lazyload } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { scale } from '@cloudinary/url-gen/actions/resize';

export function ImageCloud({
  alt,
  maxHeight = 250,
  maxWidth = 100,
  imageId = 'logo-gold_tk2tzc',
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
    imageId = 'logo-gold_3_wfioim';
    myImage = cld.image(imageId);
  }
  myImage.resize(scale().width(400).height(400));
  myImage.delivery(quality('auto:best'));

  return (
    myImage && (
      <AdvancedImage
        alt={alt}
        className={ClassName}
        cldImg={myImage}
        plugins={[
          lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.25 }),
          placeholder({ mode: 'blur' }),
        ]}
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
