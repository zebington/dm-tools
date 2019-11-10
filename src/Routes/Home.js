import React, {Component} from 'react';
import {gql, graphql} from "react-apollo";

import v4 from 'uuid/v4';

import Tracker from '../Components/Tracker';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleChangeTracked = this.handleChangeTracked.bind(this);
        this.handleAddMonster = this.handleAddMonster.bind(this);
        this.handleChooseMonster = this.handleChooseMonster.bind(this);
        this.handleChooseSession = this.handleChooseSession.bind(this);
        this.handleRemoveTracked = this.handleRemoveTracked.bind(this);
        this.handleResetTracked = this.handleResetTracked.bind(this);
        this.state = {
            tracked: [{key: v4(), name: "New", initiative: 0, content: "", hp: 0}],
            chosen: "New",
            session: 1
        }
    }

    handleChooseMonster(event) {
        this.setState({chosen: event.target.value});
    }

    handleChooseSession(event) {
        this.setState({session: Number(event.target.value), chosen: "New"});
    }

    handleAddMonster(event) {
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

    handleChangeTracked(args) {
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

    handleRemoveTracked(id) {
        let newTracked = [];
        for (let i = 0, len = this.state.tracked.length; i < len; i++) {
            if (id !== this.state.tracked[i].key) newTracked.push(this.state.tracked[i]);
        }
        this.setState({tracked: newTracked});
    }

    handleResetTracked() {
        this.setState({tracked: []});
    }

    render() {
        let monsterOptions = null;
        let sessionOptions = null;
        if (this.props.data.allMonsters) {
            for (let i = 0, len = this.props.data.allMonsters[1].sessions.length; i < len; i++) {
                console.log(this.props.data.allMonsters[1].sessions[i].number === this.state.session);
            }
            monsterOptions = this.props.data.allMonsters.map(monster => {
                let showMonster = false;
                for (let i = 0, len = monster.sessions.length; i < len; i++) {
                    if (monster.sessions[i].number === this.state.session) {
                        showMonster = true;
                        break;
                    }
                }
                return showMonster ?
                    <option key={monster.name} value={monster.name}>{monster.name}</option> : null
            });
        }
        if (this.props.data.allSessions) {
            sessionOptions = this.props.data.allSessions.map(session =>
                <option key={session.number} value={session.number}>{session.number}. {session.name}</option>
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
                     onChange={this.handleChangeTracked}
                     onRemove={this.handleRemoveTracked}
            />
        );
        return (
            <div className="app">
                {trackers}
                <div className="control">
                    <form className="add" onSubmit={this.handleAddMonster}>
                        <label>Add new: </label>
                        <select value={this.state.session} name="Sessions" onChange={this.handleChooseSession}>
                            {sessionOptions}
                        </select>
                        <select value={this.state.chosen} name="Monsters" onChange={this.handleChooseMonster}>
                            <option value="New">Empty</option>
                            {monsterOptions}
                        </select>
                        <button type="submit">Add</button>
                    </form>
                    <button onClick={this.handleResetTracked}>Reset</button>
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
    sessions {
      number
    }
  }
  allSessions(orderBy: number_ASC) {
    name
    number
  }
}`;

const HomeWithData = graphql(MonsterQuery, {
    options: {
        fetchPolicy: 'cache-and-network'
    },
})(Home);

export default HomeWithData;
