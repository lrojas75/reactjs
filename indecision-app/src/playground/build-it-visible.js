let isVisible = false;

const toggleVisibility = () => {
    isVisible = !isVisible;
    render();
}

const appRoot = document.getElementById('app');

const render = () => {
    const jsx = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={toggleVisibility}>
                {isVisible ? 'Hide details' : 'Show details'}
            </button>
            {isVisible && <p>Hey. These are some details you can now see!</p>}
        </div>
    );

    ReactDOM.render(jsx, appRoot);
};

render();