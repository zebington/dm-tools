import React, {Component} from 'react';
import {gql, graphql} from "react-apollo";

import v4 from 'uuid/v4';
import './App.css';

import Tracker from './Components/Tracker';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            tracked: [{key: v4(), name: "New", initiative: 0, content: "", hp: 0}],
            chosen: "New"
        }
    }

    handleChoose(event) {
        this.setState({chosen: event.target.value});
    }

    handleAdd(event) {
        let newTracked = this.state.tracked;
        let content = "";
        let hp = 0;
        if (this.state.chosen !== "New") {
            content = this.props.data.allMonsters.find(monster => monster.name === this.state.chosen);
            hp = Number(content.genStats.hp.split(" ")[0]);
        }
        let chosen = {
            key: v4(),
            name: this.state.chosen,
            initiative: 0,
            content: content,
            hp: hp
        };
        newTracked.push(chosen);
        this.setState({tracked: newTracked, chosen: "New"});
        event.preventDefault();
    }

    handleChange(args) {
        let newTracked = this.state.tracked.map(track => {
            if (args.id === track.key) {
                return {
                    key: args.id,
                    name: args.name ? args.name : track.name,
                    initiative: args.initiative ? args.initiative : track.initiative,
                    content: track.content,
                    hp: args.hp ? args.hp : track.hp
                }
            } else return track;
        });
        this.setState({
            tracked: newTracked
        });
    }

    handleRemove(id) {
        let newTracked = [];
        for (let i = 0, len = this.state.tracked.length; i < len; i++) {
            if (id !== this.state.tracked[i].key) newTracked.push(this.state.tracked[i]);
        }
        this.setState({tracked: newTracked});
    }

    handleReset() {
        this.setState({tracked: []});
    }

    render() {
        let options = null;
        if (!this.props.data.loading) {
            options = this.props.data.allMonsters.map(monster =>
                <option key={monster.name} value={monster.name}>{monster.name}</option>
            );
        }
        let tracked = this.state.tracked;
        tracked.sort((a, b) => (b.initiative - a.initiative));
        let trackers = this.state.tracked.map((track) =>
            <Tracker key={track.key}
                     id={track.key}
                     name={track.name}
                     initiative={track.initiative}
                     content={track.content}
                     hp={track.hp}
                     onChange={this.handleChange}
                     onRemove={this.handleRemove}
            />
        );
        return (
            <div className="app">
                {trackers}
                <div className="control">
                    <form className="add" onSubmit={this.handleAdd}>
                        <label>Add new: </label>
                        <select value={this.state.chosen} name="Monsters" onChange={this.handleChoose}>
                            <option value="New">Empty</option>
                            {options}
                        </select>
                        <button type="submit">Add</button>
                    </form>
                    <button onClick={this.handleReset}>Reset</button>
                </div>
            </div>
        );
    }
}

const MonsterQuery = gql`query allMonsters {
  allMonsters(orderBy: name_DESC) {
    name
    type
    desc
    genStats {
      ac
      hp
      speed
    }
    abilityScores {
      cha
      con
      dex
      int
      str
      wis
    }
    metaStats {
      cr
      prof
      senses
    }
    actions {
      action
      name
    }
  }
}`;

const AppWithData = graphql(MonsterQuery, {
    options: {
        fetchPolicy: 'network-only'
    },
})(App);

export default AppWithData;
