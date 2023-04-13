import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClick,
  text,
}) => {
  const handleClick = () => {
    onClick(index);
  };
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red', cursor:'pointer' }} //added pointer
      onClick={handleClick} // use function reference instead of arrow function
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null); //here the current state and function are corrected

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClick={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index } // bug fix 
          key={index} // added key to pass unique child
        />
      ))}
    </ul>
  )
};
// array changed to arrayOf and shapeOf changed to shape
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

//adding some default props
WrappedListComponent.defaultProps = {
  items: [{text:"Amit Giri"},{text:"12008090"}] 
};

const List = memo(WrappedListComponent);

export default List;