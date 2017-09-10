import React, {Component} from 'react'
import {connect} from 'react-redux'
import {moduleName, fetchAll, peopleListSelector} from '../../ducks/people'
import Loader from '../common/Loader'

class PeopleTable extends Component {
    componentDidMount() {
        this.props.fetchAll()
    }

    render() {
        if (this.props.loading) return <Loader/>
        return (
            <div>
                <table>
                    <tbody>
                    {this.getRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    getRows() {
        return this.props.people.map(this.getRow)
    }

    getRow = ({uid, firstName, lastName, email}) => {
        return <tr key={uid}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
        </tr>
    }
}


export default connect(state => ({
    people: peopleListSelector(state),
    loading: state[moduleName].loading
}), {fetchAll})(PeopleTable)
