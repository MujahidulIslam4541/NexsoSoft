import Image from 'next/image';
import {cn} from '../lib/utils';

export const Logo = ({className}: {className?: string}) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/logo-primary.png"
        alt="StackMajix Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="font-outfit text-xl font-semibold italic tracking-tight text-primary">
        StackMaJIx
      </span>
    </div>
  );
};

export const LogoIcon = ({className}: {className?: string}) => {
  return (
    <Image
      src="/logo-primary.png"
      alt="StackMajix Icon"
      width={32}
      height={32}
      className={cn('w-8 h-8', className)}
    />
  );
};
