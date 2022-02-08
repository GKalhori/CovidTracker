// side bar of the app to show search history
function SearchHistory(props) {
  const { ClearStorage, Storage } = props;

  return (
    <div className="sidenav">
      <h4 className="title">Search History</h4>

      {/* showing search history */}
      {Storage.map((item) => {
        return <p>{item}</p>;
      })}

      {/* clearing search history */}
      <div>
        <button
          className="clearButton"
          onClick={() => {
            ClearStorage();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchHistory;
