import React, {Component} from 'react';

export default class Tracker extends Component {
    constructor(props) {
        super(props);
        this.handleChangeInitiative = this.handleChangeInitiative.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeHP = this.handleChangeHP.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleChangeName(event) {
        let args = {
            id: this.props.id,
            name: event.target.value
        };
        this.props.onChange(args);
    }

    handleChangeInitiative(event) {
        let args = {
            id: this.props.id,
            initiative: Number(event.target.value)
        };
        this.props.onChange(args);
    }

    handleChangeHP(event) {
        let args = {
            id: this.props.id,
            hp: Number(event.target.value)
        };
        this.props.onChange(args);
    }

    handleRemove() {
        this.props.onRemove(this.props.id);
    };

    render() {
        let contentDiv = null;
        if (this.props.content) {
            let content = this.props.content;
            let type = content.type ? <div><hr/><p><i>{content.type}</i></p></div> : null;
            let genStatsDiv = null;
            if (content.genStats) {
                let genStats = content.genStats;
                let ac = genStats.ac ? <div><p><b>Armor Class</b> {genStats.ac}</p></div> : null;
                let hp = genStats.hp ? <div>
                    <p>
                        <b>Hit Points</b>
                        <input type="number" className="hp" value={this.props.hp} onChange={this.handleChangeHP}/>
                        {genStats.hp}
                    </p>
                </div> : null;
                let speed = genStats.speed? <div><p><b>Speed</b> {genStats.speed}</p></div> : null;
                genStatsDiv = <div><hr/>{ac}{hp}{speed}</div>;
            }
            let abilityScoresDiv = null;
            if (content.abilityScores) {
                let abilityScores = content.abilityScores;
                abilityScoresDiv = <div>
                    <hr/>
                    <table>
                        <thead><tr>
                            <th>STR</th>
                            <th>DEX</th>
                            <th>CON</th>
                            <th>INT</th>
                            <th>WIS</th>
                            <th>CHA</th>
                        </tr></thead>
                        <tbody><tr>
                            <td>{abilityScores.str}</td>
                            <td>{abilityScores.dex}</td>
                            <td>{abilityScores.con}</td>
                            <td>{abilityScores.int}</td>
                            <td>{abilityScores.wis}</td>
                            <td>{abilityScores.cha}</td>
                        </tr></tbody>
                    </table>
                </div>;
            }
            let metaStatsDiv = null;
            if (content.metaStats) {
                let metaStats = content.metaStats;
                let prof = metaStats.prof ? <div><p><b>Proficiency Bonus</b> {metaStats.prof}</p></div> : null;
                let senses = metaStats.senses ? <div><p><b>Senses</b> {metaStats.senses}</p></div> : null;
                let cr = metaStats.cr ? <div><p><b>Challenge</b> {metaStats.cr}</p></div> : null;
                metaStatsDiv = <div><hr/>{prof}{senses}{cr}</div>;
            }
            let desc = content.desc ? <div><hr/><h2>Description</h2><p>{content.desc}</p></div> : null;
            let actionsDiv = null;
            if (content.actions) {
                let actions = content.actions.map(action => <p key={action.name}><b><i>{action.name}.</i></b> {action.action}</p>);
                actionsDiv = <div><hr/><h2>Actions</h2>{actions}</div>;
            }

            contentDiv = <div className="stat-block">
                {type}
                {genStatsDiv}
                {abilityScoresDiv}
                {metaStatsDiv}
                {desc}
                {actionsDiv}
            </div>;
        }

        return <div className="tracker">
            <div className="name-line">
                <input type="text" value={this.props.name} onChange={evt => this.handleChangeName(evt)}/>
                <span>
                    <input type="number" className="initiative" value={this.props.initiative} onChange={evt => this.handleChangeInitiative(evt)}/>
                    <button onClick={this.handleRemove}>Remove</button>
                </span>
            </div>
            {contentDiv}
        </div>
    }
}
