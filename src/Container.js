// box for country name and it's information
function Container({
  name = "Country Name",
  today = "-",
  critical = "-",
  death = "-",
  recovered = "-",
}) {
  return (
    <div className="result">
      {/* country name */}
      <h4>{name}</h4>
      <div className="box">
        {/* first column */}
        <div className="column">
          <div className="today">
            <p>Today Cases</p>
            <p>{today}</p>
          </div>
          <div className="death">
            <p>Today Deaths</p>
            <p>{death}</p>
          </div>
        </div>
        {/* second column */}
        <div className="column">
          <div className="critical">
            <p>Critical</p>
            <p>{critical}</p>
          </div>
          <div className="recovered">
            <p>Today Recovered</p>
            <p>{recovered}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
