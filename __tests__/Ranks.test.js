import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Rank, SubmitSuccess } from '../src/Rank';

configure({adapter: new Adapter()});

describe('<Rank />', () => {
  let wrapper;
  beforeEach(() => {
    const articles = new Map([["key1", "value1"], ["key2", "value2"]]);
    wrapper = shallow(<Rank articles={articles}/>);
  });

  it('should render a submit button if submitted state is false', () => {
    expect(wrapper.contains(<input className="rightButton button" type="submit" value="Submit" />)).toEqual(true);
  });

  it('should render an error message if error state is true', () => {
    wrapper.setState({error: true});
    expect(wrapper.contains(<h3>An error has occured. Check your internet connection</h3>)).toEqual(true);
  });

  it('should render SubmitSuccess if submitted state is true', () => {
    wrapper.setState({submitted: true});
    expect(wrapper.contains(<SubmitSuccess />)).toEqual(true);
  });

  
});
