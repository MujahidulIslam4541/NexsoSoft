import Image from 'next/image';
import {cn} from '@/lib/utils';
import logoPrimary from '../../../public/logo-primary.png';

export const Logo = ({className}: {className?: string}) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Image

        src={logoPrimary}
        alt="NexsoSoft Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="font-outfit text-2xl font-extrabold italic tracking-tight text-primary">
        NexsoSoft
      </span>
    </div>
  );
};

export const LogoIcon = ({className}: {className?: string}) => {
  return (
    <Image

      src={logoPrimary}
      alt="NexsoSoft Icon"
      width={32}
      height={32}
      className={cn('w-8 h-8', className)}
    />
  );
};
