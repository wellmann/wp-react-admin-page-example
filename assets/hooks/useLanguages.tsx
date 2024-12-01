import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from "@wordpress/element";

interface Language {
  name: string;
  slug: string;
}

const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    apiFetch({
      path: '/pll/v1/languages',
    }).then((value: unknown) => {
      const languages = value as Language[];
      setLanguages(languages);
    });
  }, []);

  return languages;
};

export default useLanguages;