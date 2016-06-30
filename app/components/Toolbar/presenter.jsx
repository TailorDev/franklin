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
    <div className="sequence-panel">
      <h4>Sequence</h4>
      <p>{props.name}</p>

      <PositionFrom />
    </div>

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
          <h4>Labels</h4>
        </Tab>
        <Tab>
          <h4>Exons</h4>
        </Tab>
        <Tab>
          <h4>Annotations</h4>
        </Tab>
      </TabList>

      <TabPanel>
        <div className="label-panel">
          <Labels
            sequence={props.sequence}
            labels={props.labels}
          />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="exon-panel">
          <Exons {...props} />
        </div>
      </TabPanel>

      <TabPanel>
        <div className="annotation-panel">
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
  ntSequence: React.PropTypes.object,
};

export default Toolbar;
