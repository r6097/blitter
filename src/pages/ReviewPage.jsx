function TableRow({ item, price, onDelete, onEdit }) {
  return (
    <tr>
      <td>{item}</td>
      <td style={{ textAlign: "center" }}>{price}</td>
      <td style={{ textAlign: "center" }}>
        <button className="iconButton" onClick={onEdit}>
          ✏️
        </button>
      </td>
      <td style={{ textAlign: "center" }}>
        <button className="iconButton" onClick={onDelete}>
          ❌
        </button>
      </td>
    </tr>
  );
}

function TableData({ data, onDelete, onEdit, style }) {
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
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      {data.map((d, i) => (
        <TableRow
          item={d.item}
          price={d.price}
          onDelete={() => onDelete(i)}
          onEdit={() => onEdit(i)}
        />
      ))}
    </table>
  );
}

function ReviewPage() {
  const mockData = [
    { item: "Jasmine Milk Tea", price: "6.00" },
    { item: "Lychee Fruit Tea", price: "5.00" },
    { item: "Taiyaki 6pc", price: "11.95" },
    { item: "Taiyaki 6pc", price: "11.95" },
  ];

  return (
    <div
      className="maxHeight column crossCenter"
      style={{ gap: 20, justifyContent: "center", alignItems: "center" }}
    >
      <h1>Review Amount</h1>
      <div
        style={{ height: "50%", width: "60%", border: "2px solid green" }}
      ></div>
      <div style={{ width: "60%" }}>
        <div className="row" style={{ justifyContent: "end" }}>
          <button>Add item</button>
        </div>
        <TableData data={mockData} style={{ width: "100%" }} />
      </div>

      <div className="row" style={{ gap: 20 }}>
        <button>Retake photo</button>
        <button>Continue</button>
      </div>
    </div>
  );
}

export default ReviewPage;
