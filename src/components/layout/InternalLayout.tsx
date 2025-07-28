
import { ReactNode } from 'react';
import InternalHeader from './InternalHeader';
import InternalFooter from './InternalFooter';

type InternalLayoutProps = {
  children: ReactNode;
};

const InternalLayout = ({ children }: InternalLayoutProps) => {
  return (
    <div className="min-h-screen bg-ejup-darkBg flex flex-col">
      <InternalHeader />
      <main className="flex-grow">
        {children}
      </main>
      <InternalFooter />
    </div>
  );
};

export default InternalLayout;
