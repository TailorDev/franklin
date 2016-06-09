import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Immutable from 'immutable';

// see: https://github.com/mochajs/mocha/issues/1847
const { describe, it } = global;

import Label from '../Label';
import LabelEdit from '../LabelEdit';
import LabelForm from '../LabelForm';
import LabelRemove from '../LabelRemove';
import LabelTools from '../LabelTools';


describe('<Label />', () => {

  it('renders a list item', () => {
    const wrapper = shallow(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );
    expect(wrapper.find('li')).to.have.length(1);
  });

  it('renders a <LabelTools />', () => {
    const wrapper = mount(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );
    expect(wrapper.find(LabelTools)).to.have.length(1);
  });

  it('can be inactivated', () => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={spy}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    expect(wrapper.find('i.toggle')).to.have.length(1);
    wrapper.find('i.toggle').simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('can display the edition form', () => {
    const wrapper = mount(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    expect(wrapper.instance().state.displayEditForm).to.be.false;
    expect(wrapper.find(LabelEdit)).to.have.length(0);

    expect(wrapper.find('i.edit')).to.have.length(1);
    wrapper.find('i.edit').simulate('click');

    expect(wrapper.instance().state.displayEditForm).to.be.true;
    expect(wrapper.find(LabelEdit)).to.have.length(1);
    expect(wrapper.find(LabelForm)).to.have.length(1);
  });

  it('can cancel edition', () => {
    const wrapper = mount(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    wrapper.find('i.edit').simulate('click');
    expect(wrapper.instance().state.displayEditForm).to.be.true;
    wrapper.find('input[type="reset"]').simulate('click');
    expect(wrapper.instance().state.displayEditForm).to.be.false;
  });

  it('can display the deletion form', () => {
    const wrapper = mount(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    expect(wrapper.instance().state.displayRemoveForm).to.be.false;
    expect(wrapper.find(LabelRemove)).to.have.length(0);

    expect(wrapper.find('i.remove')).to.have.length(1);
    wrapper.find('i.remove').simulate('click');

    expect(wrapper.instance().state.displayRemoveForm).to.be.true;
    expect(wrapper.find(LabelRemove)).to.have.length(1);
  });

  it('can cancel deletion', () => {
    const wrapper = mount(
      <Label
        name={'foo'}
        color={'#b0b'}
        isActive={true}
        annotations={Immutable.List()}
        onToggleLabel={() => {}}
        onEditLabel={() => {}}
        onRemoveLabel={() => {}}
      />
    );

    wrapper.find('i.remove').simulate('click');
    expect(wrapper.instance().state.displayRemoveForm).to.be.true;
    wrapper.find('button.cancel').simulate('click');
    expect(wrapper.instance().state.displayRemoveForm).to.be.false;
  });
});
