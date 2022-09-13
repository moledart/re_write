import { useEffect, useRef } from 'react';

// export const useOutsideClick = (callback: () => void) => {
//   const ref = useRef<HTMLDivElement>();

//   useEffect(() => {
//     const handleClick = (
//       event: React.MouseEvent<HTMLLIElement, MouseEvent>
//     ) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         callback();
//       }
//     };

//     document.addEventListener('click', handleClick, true);

//     return () => {
//       document.removeEventListener('click', handleClick, true);
//     };
//   }, [ref]);

//   return ref;
// };

export const useOutsideClick = (callback: () => any, state: boolean) => {
  const ref = useRef<any>();
  useEffect(() => {
    const handleClick = (e: Event): void => {
      if (state && ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [state, ref]);

  return ref;
};
