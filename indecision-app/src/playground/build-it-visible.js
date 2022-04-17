class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        }
    }

    handleToggleVisibility() {
        this.setState(prevState => {
            return {
                visibility: !prevState.visibility
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.handleToggleVisibility}>
                    {this.state.visibility ? 'Hide details' : 'Show details'}
                </button>
                {this.state.visibility && <p>Hey. These are some details you can now see!</p>}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

/* let isVisible = false;

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

render(); */