import React, { Component } from 'react'
import {connect} from 'react-redux'
import {moduleName, fetchAll, peopleListSelector} from '../../ducks/people'
import {Table, Column} from 'react-virtualized'
import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

export class PeopleTableVirtualized extends Component {
    componentDidMount() {
        this.props.fetchAll()
    }

    render() {
        const {people, loading} = this.props

        // if (loading) return <Loader/>

        return (
            <Table
                rowCount={people.length}
                rowGetter={this.rowGetter}
                rowHeight={40}
                headerHeight={50}
                overscanRowCount={5}
                width={800}
                height={300}
            >
                <Column
                    label="firstName"
                    dataKey="firstName"
                    width={250}
                />
                <Column
                    label="lastName"
                    dataKey="lastName"
                    width={250}
                />
                <Column
                    label="email"
                    dataKey="email"
                    width={300}
                />
            </Table>
        )
    }

    rowGetter = ({ index }) => {
        return this.props.people[index]
    }
}

export default connect(state => ({
    people: peopleListSelector(state),
    loading: state[moduleName].loading
}), {fetchAll})(PeopleTableVirtualized)