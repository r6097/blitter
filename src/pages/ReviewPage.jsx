import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useSession } from "../hooks/useSession";

function TableRow({ item, price, onDelete, onEdit }) {
  return (
    <tr>
      <td style={{ paddingLeft: 10 }}>{item}</td>
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
      <tbody>
        {data.map((d, i) => (
          <TableRow
            key={i}
            item={d.name}
            price={d.price.toFixed(2)}
            onDelete={() => onDelete(i)}
            onEdit={() => onEdit(i)}
          />
        ))}
      </tbody>
    </table>
  );
}

function ItemModal({
  editMode = false,
  isOpen,
  onClose,
  onSave,
  initialName = "",
  initialPrice = "",
}) {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim() && price) {
      onSave(name, price);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "gray",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{editMode ? "Edit" : "Add"} Item</h2>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Item Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Price:
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        <div className="row" style={{ gap: "10px", justifyContent: "end" }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

function ReviewPage() {
  const navigate = useNavigate();

  const { currentSession, addItem, updateItem, removeItem } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleContinue = () => {
    navigate("/share");
  };

  const handleAddItem = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (index) => {
    removeItem(index);
  };

  const handleSaveItem = (name, price) => {
    if (editingIndex !== null) {
      const item = currentSession.items[editingIndex];
      updateItem(editingIndex, name, price, item.people);
    } else {
      addItem(name, price, []);
    }
  };

  const editingItem =
    editingIndex !== null ? currentSession.items[editingIndex] : null;

  const disableNextStep = currentSession.items.length == 0;

  const ScopedEditModal = useCallback(() => {
    return (
      <ItemModal
        editMode={!!editingItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        initialName={editingItem?.name || ""}
        initialPrice={editingItem?.price || ""}
      />
    );
  }, [editingItem, isModalOpen, setIsModalOpen, handleSaveItem]);

  return (
    <div
      className="maxHeight column crossCenter"
      style={{ gap: 20, justifyContent: "center", alignItems: "center" }}
    >
      <h1>Review Amount</h1>
      <div
        style={{
          height: "50%",
          width: "max(300px, 60%)",
          border: "2px solid green",
        }}
      ></div>
      <div style={{ marginBottom: 10 }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <button>Retake photo</button>
          <button onClick={handleAddItem}>Add item</button>
        </div>
        <TableData
          data={currentSession.items}
          onDelete={handleDeleteItem}
          onEdit={handleEditItem}
          style={{ width: "100%" }}
        />
      </div>

      <div className="row" style={{ marginBottom: 20, gap: 20 }}>
        <button onClick={handleContinue} disabled={disableNextStep}>
          Continue
        </button>
      </div>

      <ScopedEditModal />
    </div>
  );
}

export default ReviewPage;
