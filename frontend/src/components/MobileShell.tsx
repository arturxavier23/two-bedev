import { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
}

const MobileShell = ({ children }: MobileShellProps) => {
  return (
    <div className="flex min-h-screen justify-center bg-black">
      <div className="relative w-full max-w-[430px] min-h-screen bg-background shadow-2xl shadow-primary/5 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileShell;
