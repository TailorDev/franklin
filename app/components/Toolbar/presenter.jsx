import React from 'react';
import Immutable from 'immutable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import AnnotationForm from '../AnnotationForm';
import Labels from '../Labels';
import Search from '../Search';
import Exons from '../Exons';
import PositionFrom from '../PositionFrom';

const Toolbar = (props) => (
  <div className="toolbar">

    <div className="search-panel">
      <h4>Search</h4>
      <Search
        ntSequence={props.ntSequence}
      />
    </div>

    <Tabs
      forceRenderTabPanel
    >
      <TabList>
        <Tab>
          <h4 title="Sequence">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </h4>
        </Tab>
        <Tab>
          <h4 title="Labels">
            <i className="fa fa-tag" aria-hidden="true"></i>
          </h4>
        </Tab>
        <Tab>
          <h4 title="Exons">
            <i className="fa fa-sliders" aria-hidden="true"></i>
          </h4>
        </Tab>
        <Tab>
          <h4 title="Annotations">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </h4>
        </Tab>
      </TabList>

      <TabPanel>
        <div className="sequence-panel">
          <h4>Sequence</h4>

          <p>{props.name}</p>

          <PositionFrom
            value={props.positionFrom}
            onChange={props.onPositionFromChange}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="label-panel">
          <h4>Labels</h4>

          <Labels
            sequence={props.sequence}
            labels={props.labels}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="exon-panel">
          <h4>Exons</h4>

          <Exons {...props} />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="annotation-panel">
          <h4>Annotations</h4>

          <AnnotationForm
            sequence={props.sequence}
            labels={props.labels}
          />
        </div>
      </TabPanel>
    </Tabs>
  </div>
);

Toolbar.propTypes = {
  name: React.PropTypes.string.isRequired,
  sequence: React.PropTypes.instanceOf(Immutable.List).isRequired,
  labels: React.PropTypes.instanceOf(Immutable.List).isRequired,
  positionFrom: React.PropTypes.number.isRequired,
  ntSequence: React.PropTypes.object,
  onPositionFromChange: React.PropTypes.func.isRequired,
};

export default Toolbar;
