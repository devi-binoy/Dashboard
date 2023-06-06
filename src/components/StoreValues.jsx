//component just to check whether the data in the store is accessible from other components

import React from "react";
import { connect } from "react-redux";

function DataPage({ data }) {
  return (
    <div>
      <h1>Backflow</h1>
      <p>{data}</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.flow.flow_data.backflow, 
});

export default connect(mapStateToProps)(DataPage);
