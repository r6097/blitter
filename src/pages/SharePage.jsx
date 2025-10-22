function ItemTableRow({ item, price, onEditUsers }) {
  return (
    <tr>
      <td style={{ paddingLeft: 10 }}>{item}</td>
      <td style={{ textAlign: "center" }}>{price}</td>
      <td style={{ textAlign: "center" }}>
        <button onClick={onEditUsers}>Add User</button>
      </td>
    </tr>
  );
}

function ItemTableData({ data, onEditUsers, style }) {
  return (
    <table style={style}>
      <caption>Receipt</caption>
      <colgroup>
        <col style={{ width: "50%" }} />
        <col style={{ width: "25%" }} />
        <col style={{ width: "12.5%" }} />
        <col style={{ width: "12.5%" }} />
      </colgroup>
      <thead>
        <tr className="headerRow">
          <th scope="col">Item</th>
          <th scope="col">Price</th>
          <th scope="col">Users</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <ItemTableRow
            key={i}
            item={d.name}
            price={d.price.toFixed(2)}
            onEditUsers={() => onEditUsers(i)}
          />
        ))}
      </tbody>
    </table>
  );
}

function UserList({ users }) {
  return <table></table>;
}

function SharePage() {
  return <div>Share Page</div>;
}

export default SharePage;
