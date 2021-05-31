import useForm from '../lib/useForm';
import Form from './styles/Form';


export default function createProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 34245,
    description: 'These are the best!',
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* use existing aria attribute for loading state */}
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={clearForm}>
          Clear Form
        </button>

        <button type="button" onClick={resetForm}>
          Reset Form
        </button>

        <button type="ubmit">Add Product</button>
      </fieldset>
    </Form>
  );
}
