import {Button, Drawer, List, ListItem, Slider, Toolbar, Typography} from '@mui/material';
import {useState} from 'react';
import type {FilterBarProps} from '../interfaces/FilterBarProps';
import {DRAWER_WIDTH} from '../constants/Drawer';

const FilterBar = ({openFilterBar, onApplyFilters}: FilterBarProps) => {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const priceMarks = [
    {value: 0, label: '0$'},
    {value: 50, label: '50$'}
  ];

  const ratingMarks = [
    {value: 0, label: '0'},
    {value: 5, label: '5'}
  ];

  return (
    <Drawer variant={'persistent'} anchor={'left'} open={openFilterBar} sx={{
      width: DRAWER_WIDTH,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        boxSizing: 'border-box',
        padding: 2
      }
    }}>
      <Toolbar/>
      <List>
        <ListItem key={'Price'} sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography>Price</Typography>
          <Slider getAriaLabel={() => 'Price range'}
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue)}
                  min={0}
                  max={50}
                  step={1}
                  marks={priceMarks}
          />
        </ListItem>
        <ListItem key={'Rating'} sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography>Rating</Typography>
          <Slider getAriaLabel={() => 'Rating range'}
                  value={ratingRange}
                  onChange={(_, newValue) => setRatingRange(newValue)}
                  min={0}
                  max={5}
                  marks={ratingMarks}
                  step={0.1}
          />
        </ListItem>
      </List>
      <Button color={'secondary'} onClick={() => onApplyFilters({priceRange, ratingRange})}>Apply Filters</Button>
    </Drawer>
  );
};

export default FilterBar;