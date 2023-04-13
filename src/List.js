import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = ({
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

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => setSelectedIndex(index);

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map(({ text }, index) => (
        <SingleListItem
          onClick={() => handleClick(index)}
          text={text}
          index={index}
          isSelected={selectedIndex === index } // bug fix 
          key={index} // added key to pass unique child
        />
      ))}
    </ul>
  );
});
// array changed to arrayOf and shapeOf changed to shape
List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};
//adding some default props
List.defaultProps = {
  items: [{text:"Amit Giri"},{text:"12008090"}] 
};

export default List;