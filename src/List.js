import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = ({
  index,
  isSelected,
  onClick,
  onRemove,
  text,
}) => {
  const handleClick = () => {
    onClick(index);
  };
  
  const handleRemove = (event) => {
    event.stopPropagation(); // Stop event propagation to prevent item selection
    onRemove(index);
  };
  
  return (
    <li className='main-list'
      style={{backgroundColor: isSelected ? 'green' : 'red',}} //added pointer
      onClick={handleClick} // use function reference instead of arrow function
    >
     <span> {text}</span>
      <button className='btn-rm' onClick={handleRemove}>Remove</button>
    </li>
  );
};

SingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  text: PropTypes.string,
}.isRequired;

// List Component
const List = memo(({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => setSelectedIndex(index);

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setSelectedIndex(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newItemText.trim() === '') {
      return;
    }
    const newItems = [...items, { text: newItemText }];
    setItems(newItems);
    setNewItemText('');
  };

  return (
    <div className="main-div">
      <h1>Frontend List</h1>
      <ul >
        {items.map(({ text }, index) => (
          <SingleListItem
            onClick={() => handleClick(index)}
            onRemove={handleRemove}
            text={text}
            index={index}
            isSelected={selectedIndex === index } // bug fix 
            key={index} // added key to pass unique child
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit} >
        <input  type="text" value={newItemText} onChange={(event) => setNewItemText(event.target.value)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};
//adding some default props
List.defaultProps = {
  items: [{text:"Amit Giri"},{text:"12008090"}, {text:"thisisag840@gmail.com"}] 
};

export default List;