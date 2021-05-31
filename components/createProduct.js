import useForm from '../lib/useForm';
import Form from './styles/Form';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are passed in and what are their types?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;
export default function createProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice shoes',
    price: 34245,
    description: 'These are the best!',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // any additional data that comes along
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend
        // you can pass variables here if you don't know them at time of definition
        await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      {/* use existing aria attribute for loading state intead of making separate variables */}
      <fieldset disabled={loading} aria-busy={loading}>
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
