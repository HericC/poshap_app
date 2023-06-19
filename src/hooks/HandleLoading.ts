import { useState } from 'react';

const HandleLoading = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = (isLoading: boolean) => setLoading(isLoading);

  return { loading, handleLoading };
};

export default HandleLoading;
