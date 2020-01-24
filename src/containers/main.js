import React from 'react';
import shortid from 'shortid';
import { Link } from "react-router-dom";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    tick(val) {
        const id = shortid.generate();
        this.setState(state => ({
            count: id
        }));
    }

    componentDidMount() {
        const id = shortid.generate();
        console.log('id = ', id);
        this.interval = setInterval(() => this.tick(id), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.tick());
    }

    render() {
        return (
            <div>
                <p>Hi! Main</p>
                <Link to="/" />
            </div>
        )    
    }
}

export default Main;