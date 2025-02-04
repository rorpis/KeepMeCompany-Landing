import { LockKeyhole } from 'lucide-react';
import Image from 'next/image';

const Badge = ({ children, className = '' }) => (
  <div className={`w-16 h-16 flex items-center justify-center p-2 border border-gray-300 rounded-lg opacity-60 transition-opacity duration-300 hover:opacity-100 ${className}`}>
    {children}
  </div>
);

const Certifications = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      {/* ISO Badge */}
      <Badge>
        <div className="flex flex-col items-center">
          <span className="text-base font-roboto">ISO</span>
          <span className="text-[10px] font-roboto">13845</span>
          <span className="text-[8px] text-gray-500 font-roboto">Compliant</span>
        </div>
      </Badge>

      {/* GDPR Badge */}
      <Badge>
        <div className="flex flex-col items-center">
          <Image
            src="/certifications/GDPR.png"
            alt="GDPR Certification"
            width={37}
            height={37}
            priority
            className="object-contain brightness-0 invert"
          />
        </div>
      </Badge>

      {/* NHS Badge */}
      <Badge>
        <div className="flex flex-col items-center">
          <span className="text-sm italic font-roboto">NHS</span>
          <span className="text-[8px] text-gray-500 font-roboto">Compliant</span>
        </div>
      </Badge>

      {/* CE Badge */}
      <Badge className="w-12 h-12">
        <Image
          src="/certifications/CE.png"
          alt="CE Mark"
          width={37}
          height={37}
          priority
          className="object-contain brightness-0 invert"
        />
      </Badge>

      {/* Cyber Essentials Badge */}
      <Badge>
        <div className="flex flex-col items-center">
          <LockKeyhole className="w-6 h-6 mb-1" />
          <span className="text-[8px] text-gray-500 font-roboto">Cyber</span>
          <span className="text-[8px] text-gray-500 font-roboto">Essentials</span>
        </div>
      </Badge>
    </div>
  );
};

export default Certifications;