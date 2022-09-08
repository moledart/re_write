import Image from 'next/image';
import { RiArrowDownSLine } from 'react-icons/ri';

const Account = () => {
  return (
    <div className="bg-white p-4 flex items-center rounded-lg">
      <Image
        src="https://picsum.photos/200?grayscale"
        width="40px"
        height="40px"
        className="rounded-sm"
      />
      <p className="text-xl font-medium ml-4">Andrei K</p>
      <RiArrowDownSLine size="24px" className="ml-auto" />
    </div>
  );
};

export default Account;
