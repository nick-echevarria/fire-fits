import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') value = parseInt(value);
    // if working with files, must set first item of array to be files
    // that's how file uploads work
    if (type === 'file') value[0] = e.target.files;
    setInputs({
      // copy existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // create  array, map over array to set keys to zero, then feed
    // that to Object.fromEntries to turn it back into array
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return info we want surfaced from this custom hook
  // (necessary to return)
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
