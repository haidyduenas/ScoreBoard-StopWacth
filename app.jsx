
class Timer extends React.Component {
  constructor (props) {
  super (props);
    this.state = {
        date:0,
        current : false
    }
  }
  render () {
    const {title} = this.props;
    const start = (e) => {
      this.startTimer();
    }
    const stop = (e) => {
      this.stopTimer();
    }
    const reset = (e) => {
    this.resetTimer();
    }
    return(
    <div>
    <h2> {title} </h2>
      <p> {this.state.date}</p>
      { this.state.current ?<button onClick={stop}>Stop</button>:<button onClick={start}>Start</button>}
      <button onClick={reset}>Reset</button>
    </div>
    );
  }
  startTimer () {
  this.timer = setInterval( () => {
    this.setState ({
      date : this.state.date + 1,
      current : true
      }) ;
    }, 1000);
  }
  resetTimer () {
    this.setState({
      date: 0
    })
  clearInterval(this.timer);
  }
  stopTimer(){
    clearInterval(this.timer);
    this.setState({
      current : false
    })
  }
}

class Model {
      constructor() {
         this.players = [{name: "Jim Hoskins",score: 31,id: 1,},{name: "Andree Hoskins",score: 35,id: 2,},{name: "Alena Hoskins",score: 42,id: 3,}];
         this.inputValue = null;
         this.render = undefined;
      }
   
      subscribe(render) {
         this.render = render;
      }
      inform() {
         this.render();
      }
      addPlayers(name) {
         this.players.push({
            id: Utils.uuid(),
            name: name,
            score: 0,
         });
         this.inform();
      }
      addPoints(players,index) {
            this.players[index].score++;
            this.inform();
      }

      removePoints(players,index) {
            this.players[index].score--;
            this.inform();
      }
   

   pointsSet(players){
      console.log(this.players[1].score);
      return this.players.map((players,i) => this.players[i].score).reduce((playerA, playerB) => playerA + playerB);
      this.inform();
      }

}

    const Header = ({players,i}) => {
      return (
        <div>
          <header className='header'>
            <table className='stats'>
            <tbody>
              <tr>
                <td>PLAYERS:</td>
                <td>{model.players.length}</td>
              </tr>
              <tr>
                <td>TOTAL POINTS:</td>
                <td>{model.pointsSet()}</td>
              </tr>
              </tbody>
            </table>
            <div className="stopwatch">
            <Timer/>
            </div>
            
          </header>
        </div>
      );
    }
    const PlayerList = ({players}) => {
      return (
        <div>
          {
            model.players.map((item,index) => {
              return <div className='player' key={item.name}>
                <div className='player-name'>{item.name}</div>
                <div className='player-score counter'>
                  <button className='counter-action decrement'onClick={() => model.removePoints(players,index)}>-</button>
                  <span className='counter-score'>{item.score}</span>
                  <button className='counter-action increment'onClick={() => model.addPoints(players,index)}>+</button>
                </div>
              </div>
            })
          }
        </div>
      );
    }
    const PlayerForm = () => {
      return (
        <div className='add-player-form'>
          <form
          onSubmit={e => {
               e.preventDefault();
               model.addPlayers(model.inputValue);
            }}
          >
            <input type="text" placeholder='ENTER A NAME'
            onChange={e => (model.inputValue = e.target.value)}/>
            <input type="submit" value='add player' />
          </form>
        </div>
      );
    }
    
const Application = ({ title, players }) => {
      return (
        <div className='scoreboard'>
          <Header players={players} />
          <PlayerList players={players}/>
          <PlayerForm />    
        </div>
      );
    }
let model = new Model();
let counter = 1;

let render = () => {
   console.log('render times: ', counter++);
   ReactDOM.render(
      <Application title="ScoreBoard" model={model} />,
      document.getElementById('container')
   );
};

model.subscribe(render); 

render(); 