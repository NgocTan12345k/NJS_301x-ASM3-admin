import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./AddNewProduct.scss";

const AddNewProduct = () => {
  const initialValue = {
    productName: "",
    category: "",
    price: "",
    short_desc: "",
    long_desc: "",
    quantity: 0,
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const formData = new FormData();

  formData.append("productName", formValues.productName);
  formData.append("category", formValues.category);
  formData.append("price", formValues.price);
  formData.append("short_desc", formValues.short_desc);
  formData.append("long_desc", formValues.long_desc);
  formData.append("quantity", formValues.quantity);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOnChangeFile = (fileList) => {
    for (let i = 0; i < fileList.length; i++) {
      const files = fileList[i];

      formData.append("images", files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postAddProduct = () => {
      fetch("http://localhost:3500/api/product/postAddProduct", {
        method: "POST",

        body: formData,
      })
        .then((res) => {
          return res.clone().json();
        })
        .then((data) => {
          console.log("data-->", data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    postAddProduct();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    setFormValues(initialValue);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};

    if (!values.productName) {
      errors.productName = "Product Name is required!";
    }
    if (!values.category) {
      errors.category = "Category is required!";
    }
    if (!values.price) {
      errors.price = "Price is required!";
    }
    if (!values.short_desc) {
      errors.short_desc = "Short Description is required!";
    }
    if (!values.long_desc) {
      errors.long_desc = "Long Description is required!";
    }
    if (!values.quantity) {
      errors.quantity = "Quantity is required!";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="page-wrapper">
        {Object.keys(formErrors).length === 0 &&
          isSubmit &&
          alert("Add product successful!")}
        <h1 style={{ marginLeft: "30px" }}>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="formInput">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={formValues.productName}
              onChange={handleOnChange}
            ></input>
            <p>{formErrors.productName}</p>
          </div>
          <div className="formInput">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              value={formValues.category}
              onChange={handleOnChange}
            ></input>
            <p>{formErrors.category}</p>
          </div>
          <div className="formInput">
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter Price"
              value={formValues.price}
              onChange={handleOnChange}
            ></input>
            <p>{formErrors.price}</p>
          </div>

          <div className="formInput">
            <label>Short Description</label>
            <textarea
              className="short-description"
              name="short_desc"
              type="text"
              placeholder="Enter Short Description"
              value={formValues.short_desc}
              onChange={handleOnChange}
            ></textarea>
            <p>{formErrors.short_desc}</p>
          </div>

          <div className="formInput">
            <label>Long Description</label>
            <textarea
              className="long-description"
              name="long_desc"
              type="text"
              placeholder="Enter Long Description"
              value={formValues.long_desc}
              onChange={handleOnChange}
            ></textarea>
            <p>{formErrors.long_desc}</p>
          </div>
          <div className="formInput">
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter Quantity"
              value={formValues.quantity}
              onChange={handleOnChange}
            ></input>
            <p>{formErrors.quantity}</p>
          </div>

          <div className="formInput">
            <label htmlFor="images">Upload image (4 images)</label>
            <input
              multiple
              type="file"
              name="images"
              id="images"
              encType="multipart/form-data"
              style={{ border: "none" }}
              onChange={(e) => handleOnChangeFile(e.target.files)}
            ></input>
          </div>
          <div className="formInput">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewProduct;
