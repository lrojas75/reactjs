'use strict';

var isVisible = false;

var toggleVisibility = function toggleVisibility() {
    isVisible = !isVisible;
    render();
};

var appRoot = document.getElementById('app');

var render = function render() {
    var jsx = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Visibility Toggle'
        ),
        React.createElement(
            'button',
            { onClick: toggleVisibility },
            isVisible ? 'Hide details' : 'Show details'
        ),
        isVisible && React.createElement(
            'p',
            null,
            'Hey. These are some details you can now see!'
        )
    );

    ReactDOM.render(jsx, appRoot);
};

render();
