const GroupUsersChats = () => {
  return ["", "", "", ""].map((i, ind) => (
    <div key={ind} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Пример карты</h2>
        <p>Тут чат</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            Тут перейти в чат например
          </button>
        </div>
      </div>
    </div>
  ));
};

export default GroupUsersChats;
