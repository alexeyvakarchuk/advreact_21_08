import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addPerson} from '../../ducks/people'
import PeopleTableVirtualized from '../people/PeopleTableVirtualized'
import NewPersonForm from '../people/NewPersonForm'

class PersonPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <PeopleTableVirtualized />
                <h2>Add new person</h2>
                <NewPersonForm onSubmit={this.props.addPerson}/>
            </div>
        )
    }
}

export default connect(null, {addPerson})(PersonPage)