const getCurrentBlockquote = require('./getCurrentBlockquote');
const unwrapBlockquote = require('./changes/unwrapBlockquote');

/**
 * User pressed Enter in an editor
 *
 * Enter on an empty block inside a blockquote exit the blockquote.
 */
function onEnter(event, change, opts) {
    const { state } = change;
    const { startBlock } = state;

    if (!getCurrentBlockquote(opts, state)) {
        return null;
    }

    // Block is empty, we exit the blockquote
    if (startBlock.text.length === 0) {
        event.preventDefault();

        return unwrapBlockquote(opts, change);
    }
}

module.exports = onEnter;
