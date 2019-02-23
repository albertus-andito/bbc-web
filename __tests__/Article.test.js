import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Article, ArticleComp } from '../src/Article';

configure({adapter: new Adapter()});

describe('<Article />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Article />);
  });

  it('should render the article\'s title (according to its state)', () => {
    wrapper.setState({ title: 'An article title' });
    expect(wrapper.contains(<h2>An article title</h2>)).toEqual(true);
  });

  it('should render three ArticleComp elements (according to its state)', () => {
    wrapper.setState({ body: [1, 2, 3] });
    expect(wrapper.find(ArticleComp)).toHaveLength(3);
  });
});

describe('<ArticleComp />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ArticleComp />);
  });

  it('should render the component as Heading 3 if the type is heading', () => {
    wrapper.setProps({ type: 'heading', model: {text: 'This is a heading'} });
    expect(wrapper.contains(<h3>This is a heading</h3>)).toEqual(true);
  });

  it('should render the component as Paragraph if the type is paragraph', () => {
    wrapper.setProps({ type: 'paragraph', model: {text: 'This is a paragraph'} });
    expect(wrapper.contains(<p>This is a paragraph</p>)).toEqual(true);
  });

  it('should render the component as img if the type is image', () => {
    wrapper.setProps({ type: 'image', model: {url: './sample.jpg'} });
    expect(wrapper.contains(<img src='./sample.jpg'/>)).toEqual(true);
  });

  it('should render the component as List if the type is list', () => {
    wrapper.setProps({ type: 'list', model: {items: ['item1', 'item2']} });
    expect(wrapper.contains(<ul><li>item1</li><li>item2</li></ul>)).toEqual(true);
  });


});