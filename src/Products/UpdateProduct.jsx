import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductAPI from "../API/ProductAPI";

const UpdateProduct = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProductDetail = async () => {
      const response = await ProductAPI.getDetail(id);
      setProductDetail(response);
      // const res = await axios.get(`http://localhost:3500/api/product/${id}`);

      // const data = res && res.data ? res.data : {};

      // setProductDetail(data);
    };
    getProductDetail();
  }, [id]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProductDetail({ ...productDetail, [name]: value });
  };
  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const updateProduct = async () => {
      try {
        const response = await ProductAPI.updateProduct(id, productDetail);
        if (response) {
          alert("Update Product successful!");
          setProductDetail(response);
        } else {
          alert("Update Product unsuccessful!");
        }
      } catch (error) {
        console.log(error);
      }
      // fetch(`http://localhost:3500/api/product/update/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(productDetail),
      // })
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((data) => {
      //     if (data) {
      //       alert("Update Product successful!");
      //       setProductDetail(data);
      //     } else {
      //       alert("Update Product unsuccessful!");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    };
    updateProduct();

    setFormErrors(validate(productDetail));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Product Name is required!";
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

    return errors;
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="page-wrapper">
        <h1 style={{ marginLeft: "30px" }}>Update Product</h1>
        <form onSubmit={handleUpdateProduct}>
          <div className="formInput">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={productDetail.name}
              onChange={(event) => handleOnChange(event)}
            ></input>
            <p>{formErrors.name}</p>
          </div>
          <div className="formInput">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={productDetail.category}
              onChange={(event) => handleOnChange(event)}
            ></input>
            <p>{formErrors.category}</p>
          </div>
          <div className="formInput">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={productDetail.price}
              onChange={(event) => handleOnChange(event)}
            ></input>
            <p>{formErrors.price}</p>
          </div>

          <div className="formInput">
            <label>Short Description</label>
            <textarea
              className="short-description"
              name="short_desc"
              type="text"
              value={productDetail.short_desc}
              onChange={(event) => handleOnChange(event)}
            ></textarea>
            <p>{formErrors.short_desc}</p>
          </div>

          <div className="formInput">
            <label>Long Description</label>
            <textarea
              className="long-description"
              name="long_desc"
              type="text"
              value={productDetail.long_desc}
              onChange={(event) => handleOnChange(event)}
            ></textarea>
            <p>{formErrors.long_desc}</p>
          </div>
          <div className="formInput">
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Enter Quantity"
              value={productDetail.quantity}
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
              disabled
            ></input>
          </div>
          <div className="formInput">
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
