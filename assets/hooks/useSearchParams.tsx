import { useEffect, useState } from '@wordpress/element';

const useSearchParams = (param: string, defaultValue: string) => {
  const { pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  const [value, setValue] = useState(urlParams.get(param) || defaultValue);

  useEffect(() => {
    urlParams.set(param, value);
    window.history.replaceState({}, '', pathname + '?' + urlParams.toString());
  }, [value]);

  return [value, setValue] as const;
};

export default useSearchParams;
