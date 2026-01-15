import Image from 'next/image';
import { auth } from '@/auth';

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <div 
      className="rounded-lg p-3 border"
      style={{ 
        background: 'linear-gradient(to right, #1f2937, #374151)',
        borderColor: '#4b5563'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full blur-md"
            style={{ 
              background: 'linear-gradient(to right, #3b82f6, #a855f7)',
              opacity: 0.3 
            }}
          ></div>
          <Image 
            src={session.user.image!}
            alt="프로필"
            width={48}
            height={48}
            className="relative rounded-full object-cover"
            style={{ border: '2px solid #374151' }}
          />
        </div>
        <p className="text-sm font-semibold text-white truncate">
          {session.user.name}
        </p>
      </div>
    </div>
  );
}