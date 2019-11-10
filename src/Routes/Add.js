import React, {Component} from 'react';

class Add extends Component {
    constructor() {
        super();
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeAbilityScore = this.onChangeAbilityScore.bind(this);
        this.onChangeGenStats = this.onChangeGenStats.bind(this);
        this.onChangeMetaStats = this.onChangeMetaStats.bind(this);
        this.state = {
            name: "",
            type: "",
            desc: "",
            abilityScores: {
                str: 10,
                dex: 10,
                con: 10,
                int: 10,
                wis: 10,
                cha: 10
            },
            genStats: {
                ac: 10,
                hp: "",
                speed: ""
            },
            metaStats: {
                cr: "",
                prof: "",
                senses: "",
                skills: ""
            }
        }
    }

    onChangeBase(event) {
        let id = event.target.id;
        let val = event.target.value;
        this.setState({
            name: id === "name" ? val : this.props.name,
            type: id === "type" ? val : this.props.type,
            desc: id === "desc" ? val : this.props.desc
        });
    }

    onChangeAbilityScore(event) {
        let id = event.target.id;
        let val = Number(event.target.value);
        let abilityScores = this.state.abilityScores;
        this.setState({abilityScores: {
            str: id === "str" ? val : abilityScores.str,
            dex: id === "dex" ? val : abilityScores.dex,
            con: id === "con" ? val : abilityScores.con,
            int: id === "int" ? val : abilityScores.int,
            wis: id === "wis" ? val : abilityScores.wis,
            cha: id === "cha" ? val : abilityScores.cha
        }})
    }

    onChangeGenStats(event) {
        let id = event.target.id;
        let val = event.target.value;
        let genStats = this.state.genStats;
        this.setState({genStats: {
            hp: id === "hp" ? val : genStats.hp,
            ac: id === "ac" ? Number(val) : genStats.ac,
            speed: id === "speed" ? val : genStats.speed
        }})
    }

    onChangeMetaStats(event) {
        let id = event.target.id;
        let val = event.target.value;
        let metaStats = this.state.metaStats;
        this.setState({metaStats: {
            cr: id === "cr" ? val : metaStats.cr,
            profs: id === "profs" ? val : metaStats.profs,
            senses: id === "senses" ? val : metaStats.senses,
            skills: id === "skills" ? val : metaStats.skills
        }})
    }

    render() {
        return <div className="app">
            <form className="add-form">
                <fieldset>
                    <legend>New Monster</legend>

                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Name"
                           value={this.state.name} onChange={this.onChangeBase}/>

                    <label htmlFor="type">Type</label>
                    <input type="text" id="type" name="type" placeholder="Type"
                           value={this.state.type} onChange={this.onChangeBase}/>

                    <label htmlFor="desc">Description</label>
                    <textarea id="desc" name="desc" placeholder="Description"
                              value={this.state.desc} onChange={this.onChangeBase}/>

                    <fieldset>
                        <legend>Ability Scores</legend>
                        <table>
                            <thead><tr>
                                <th><label htmlFor="str">STR</label></th>
                                <th><label htmlFor="dex">DEX</label></th>
                                <th><label htmlFor="con">CON</label></th>
                                <th><label htmlFor="int">INT</label></th>
                                <th><label htmlFor="wis">WIS</label></th>
                                <th><label htmlFor="cha">CHA</label></th>
                            </tr></thead>
                            <tbody><tr>
                                <td><input type="number" id="str" name="str" value={this.state.abilityScores.str}
                                           onChange={this.onChangeAbilityScore}/></td>
                                <td><input type="number" id="dex" name="dex" value={this.state.abilityScores.dex}
                                           onChange={this.onChangeAbilityScore}/></td>
                                <td><input type="number" id="con" name="con" value={this.state.abilityScores.con}
                                           onChange={this.onChangeAbilityScore}/></td>
                                <td><input type="number" id="int" name="int" value={this.state.abilityScores.int}
                                           onChange={this.onChangeAbilityScore}/></td>
                                <td><input type="number" id="wis" name="wis" value={this.state.abilityScores.wis}
                                           onChange={this.onChangeAbilityScore}/></td>
                                <td><input type="number" id="cha" name="cha" value={this.state.abilityScores.cha}
                                           onChange={this.onChangeAbilityScore}/></td>
                            </tr></tbody>
                        </table>
                    </fieldset>

                    <label htmlFor="hp">HP</label>
                    <input type="text" id="hp" name="hp" placeholder="HP"
                           value={this.state.genStats.hp} onChange={this.onChangeGenStats}/>

                    <label htmlFor="ac">AC</label>
                    <input type="number" id="ac" name="ac" placeholder="AC"
                           value={this.state.genStats.ac} onChange={this.onChangeGenStats}/>

                    <label htmlFor="speed">Speed</label>
                    <input type="text" id="speed" name="speed" placeholder="Speed"
                           value={this.state.genStats.speed} onChange={this.onChangeGenStats}/>
                    <hr/>
                    <label htmlFor="cr">Challenge Rating</label>
                    <input type="text" id="cr" name="cr" placeholder="Challenge Rating"
                           value={this.state.metaStats.cr} onChange={this.onChangeMetaStats}/>

                    <label htmlFor="prof">Proficiency Bonus</label>
                    <input type="text" id="prof" name="prof" placeholder="Proficiency Bonus"
                           value={this.state.metaStats.prof} onChange={this.onChangeMetaStats}/>

                    <label htmlFor="senses">Senses</label>
                    <input type="text" id="senses" name="senses" placeholder="Senses"
                           value={this.state.metaStats.senses} onChange={this.onChangeMetaStats}/>

                    <label htmlFor="skills">Skills</label>
                    <input type="text" id="skills" name="skills" placeholder="Skills"
                           value={this.state.metaStats.skills} onChange={this.onChangeMetaStats}/>
                </fieldset>
            </form>
        </div>
    }
}

export default Add;
