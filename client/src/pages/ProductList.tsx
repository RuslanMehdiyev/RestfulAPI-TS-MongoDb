import { Modal } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { Product } from "../models/products/ProductModel";
import { ProductService } from "../services/productService/ProductService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList() {
  const productService = new ProductService();
  const [modalType, setModalType] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [newData, setNewData] = useState<Product>({
    _id: "",
    name: "",
    description: "",
    date: "",
  });

  let { data, isLoading, refetch } = useQuery<Product[]>(
    "products",
    async () => {
      return productService.getAll().then((res) => {
        return res.data;
      });
    }
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleDelete = (id: string) => {
    productService.delete(`/${id}`).then(() => {
      refetch();
      toast.warning("Product deleted");
    });
  };
  const showModal = () => {
    setModalType(false);
    setOpen(true);
    setNewData({ _id: "", name: "", description: "", date: "" });
  };

  const handleOk = (event: React.SyntheticEvent) => {
    event.preventDefault();
    productService
      .add("", newData)
      .then(() => {
        refetch();
        toast.success("Product added");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setOpen(false);
    setNewData({ _id: "", name: "", description: "", date: "" });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal2 = (item: any) => {
    setOpen(true);
    setModalType(true);
    setNewData({
      _id: item._id,
      name: item.name,
      description: item.description,
      date: item.date,
    });
  };

  const handleUpdate = (event: any) => {
    event.preventDefault();
    setOpen(false);
    productService
      .update(`/${newData._id}`, newData)
      .then(() => {
        refetch();
        toast.success("Product updated");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="products">
      <ToastContainer />
      <div className="products-header">
        <h1>Products</h1>
        <button onClick={showModal} className="add">
          Add
        </button>
      </div>
      {data?.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.date.substring(0, 10)}</td>
                <td>
                  <button className="update" onClick={() => showModal2(item)}>
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Data is Empty</h1>
      )}
      <Modal
        title={modalType ? `Updating id:${newData._id}` : "New Product"}
        open={open}
        footer={""}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={modalType ? handleUpdate : handleOk}
          className="submitForm"
        >
          <label id="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInput}
            value={newData.name}
            // required
          />
          <label id="name">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleInput}
            value={newData.description}
            // required
          />
          <div>
            <button className="add">{modalType ? "Update" : "Add"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ProductList;
