import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSelectionsForPreview } from '../../redux/shop/shop.selectors';

import CollectionPreview from '../preview-collection/collection-preview';
import './collections-overview.styles.scss';

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectSelectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);