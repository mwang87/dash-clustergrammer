import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as d3 from "d3";
import _ from "lodash";
import Clustergrammer from 'clustergrammer';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class DashClustergrammer extends Component {
    render() {
        const {id, label, setProps, value} = this.props;
        
        return (
            <div className="theme" id={id}>
                <h1>{label}</h1>
                <div id='cgm-container'>
                    <h1 className='wait_message'>Please wait ...</h1>
                </div>
            </div>
        );
    }

    componentDidMount() {

        var network_data = this.props.network_data;

        var args = {
            'root': '#cgm-container',
            'network_data': network_data
        }

        resize_container(args);

        d3.select(window).on('resize', function () {
            resize_container(args);
            cgm.resize_viz();
        });


        // Clustergrammer returns a Clustergrammer object in addition to making
        // the visualization
        var cgm = Clustergrammer(args);
        d3.select(cgm.params.root + ' .wait_message').remove();
    }

}

DashClustergrammer.defaultProps = {};

DashClustergrammer.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * The JSON data that Clustergrammer takes in as input
     */
    network_data: PropTypes.object.isRequired,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

function resize_container(args) {

    var screen_width = window.innerWidth;
    var screen_height = window.innerHeight - 20;

    d3.select(args.root)
        .style('width', screen_width + 'px')
        .style('height', screen_height + 'px');
}



