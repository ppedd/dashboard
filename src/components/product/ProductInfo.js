import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProductInfo({
  categories,
  currentProduct,
  onSetProductData,
}) {
  // const [productCode, setProductCode] = useState(currentProduct.id);
  // const [productTitle, setProductTitle] = useState(currentProduct.title);
  // const [productGroup, setProductGroup] = useState(currentProduct.category);
  // const [productPrice, setProductPrice] = useState(currentProduct.price);

  // const productCodeHandler = (event) => setProductCode(event.target.value);
  // const productTitleHandler = (event) => setProductTitle(event.target.value);
  // const productGroupHandler = (event) => setProductGroup(event.target.value);
  // const productPriceHandler = (event) => setProductPrice(event.target.value);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitFormHandler = (formData) => {
    formData.categoryId = Number(formData.categoryId);
    formData.id = Number(formData.id);
    formData.category = categories.find(
      (category) => category.id === formData.categoryId
    ).title;
    onSetProductData(formData);
  };
  // console.log(watch("productPrice"));
  return (
    <form className="row g-3" onSubmit={handleSubmit(submitFormHandler)}>
      <div className="col-md-6">
        <label htmlFor="productCode" className="form-label">
          Product Code
        </label>
        <input
          type="text"
          className="form-control"
          id="id"
          name="id"
          defaultValue={currentProduct.id}
          // onChange={productCodeHandler}
          {...register("id", { required: true, pattern: /\d+/ })}
        />
        {errors.id?.type === "required" && (
          <p className="text-danger mt-1">Product code is required.</p>
        )}
        {errors.id?.type === "pattern" && (
          <p className="text-danger mt-1">Just enter numbers.</p>
        )}
      </div>
      <div className="col-md-6">
        <label htmlFor="title" className="form-label">
          Product Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          defaultValue={currentProduct.title}
          // onChange={titleHandler}
          {...register("title", { required: true })}
        />
        {errors.title?.type === "required" && (
          <p className="text-danger mt-1">Write a title for your product.</p>
        )}
      </div>
      <div className="col-8">
        <label htmlFor="categoryId" className="form-label">
          Group of Products
        </label>
        <select
          id="categoryId"
          className="form-select"
          name="categoryId"
          defaultValue={currentProduct.categoryId}
          // onChange={productGroupHandler}
          {...register("categoryId")}
        >
          {categories.map(({ id, title }) => (
            <option value={id} key={id}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <div className="col-4">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          defaultValue={currentProduct.price}
          {...register("price", {
            required: true,
            pattern: /\d+/,
            maxLength: 6,
          })}
          // onChange={productPriceHandler}
        />
        {errors.price?.type === "required" && (
          <p className="text-danger mt-1">The product price is required.</p>
        )}
        {errors.price?.type === "pattern" && (
          <p className="text-danger mt-1">Enter only numbers.</p>
        )}
        {errors.price?.type === "maxLength" && (
          <p className="text-danger mt-1">
            Max length of price is just 6 digits.
          </p>
        )}
      </div>
      <div className="col-12 text-end">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
