/* eslint-disable react/prop-types */

const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const { Editor } = require('slate-react');
const PluginEditBlockquote = require('../lib/');

const stateJson = require('./state');

const plugin = PluginEditBlockquote();
const plugins = [
    plugin
];

const SCHEMA = {
    nodes: {
        blockquote: props => <blockquote {...props.attributes}>{props.children}</blockquote>,
        paragraph:  props => <p {...props.attributes}>{props.children}</p>,
        heading:    props => <h1 {...props.attributes}>{props.children}</h1>
    }
};

const Example = React.createClass({
    getInitialState() {
        return {
            state: Slate.State.fromJSON(stateJson)
        };
    },

    onChange({ state }) {
        this.setState({
            state
        });
    },

    onWrapInBlockquote(e) {
        const { state } = this.state;

        this.onChange(
            plugin.changes.wrapInBlockquote(state.change())
        );
    },

    onUnwrapBlockquote(e) {
        const { state } = this.state;

        this.onChange(
            plugin.changes.unwrapBlockquote(state.change())
        );
    },

    render() {
        const { state } = this.state;
        const inBlockquote = plugin.utils.isSelectionInBlockquote(state);

        return (
            <div>
                <div>
                    <button onClick={this.onWrapInBlockquote}>Blockquote</button>
                    <button onClick={this.onUnwrapBlockquote} disabled={!inBlockquote}>Unwrap</button>
                </div>
                <Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    state={state}
                    onChange={this.onChange}
                    schema={SCHEMA}
                />
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
