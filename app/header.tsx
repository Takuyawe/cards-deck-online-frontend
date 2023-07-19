import Link from 'next/link';
import Image from 'next/image';

const header = () => {
  return (
    <header>
      <nav className="p-2">
        <ul className="flex items-center space-x-2">
          <li>
            <Image width={300} height={300} alt='picture' src="/vercel.svg" className="w-32" />
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="https://nextjs.org/learn/basics/create-nextjs-app/welcome-to-nextjs">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default header;