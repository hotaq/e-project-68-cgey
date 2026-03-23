import Image from "next/image";
import Link from "next/link";
import heroIllustration from "@/public/imgs/main_photo.png";

const navigation = [
  { label: "Home", active: true },
  { label: "Classes", active: false },
  { label: "Plans", active: false },
  { label: "About Us", active: false },
];

const highlights = [
  {
    value: "1000+",
    description: "Courses to choose from",
    accent: "text-brand-yellow",
  },
  {
    value: "5000+",
    description: "Students Trained",
    accent: "text-brand-blue",
  },
  {
    value: "200+",
    description: "Professional Trainers",
    accent: "text-brand-orange",
  },
];

export default function Home() {
  return (
    <div className="macbook-frame mx-auto shrink-0 text-foreground overflow-hidden relative z-0">
      <div 
        style={{
          position: 'absolute',
          width: '1512px',
          height: '841px',
          left: '0px',
          top: '70px',
          background: '#F8F8F8',
          zIndex: -1
        }}
      />
      <h1 className="hero-title-figma page-reveal z-10">
        Match Your Skills with the Right Opportunity.
      </h1>
      <p 
        className="page-reveal z-10 hero-copy"
        style={{
          position: 'absolute',
          width: '501px',
          height: '76px',
          left: '115px',
          top: '361px',
          fontFamily: "'Open Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '130%',
          color: '#000000',
          opacity: 0.6
        }}
      >
        Access <strong className="font-bold">1000+</strong>{" "}
        career opportunities across top companies. Connect with industry
        professionals and secure your future through interview bookings.
      </p>
      <button
        type="button"
        className="page-reveal z-10 transition-transform duration-200 hover:-translate-y-0.5"
        style={{
          boxSizing: 'border-box',
          position: 'absolute',
          width: '200px',
          height: '60px',
          left: '106px',
          top: '456px',
          background: '#D37624',
          borderRadius: '50px',
          fontFamily: "'Open Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '140%',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animationDelay: '160ms'
        }}
      >
        Start Trial
      </button>
      <button
        type="button"
        className="page-reveal z-10 transition-transform duration-200 hover:-translate-y-0.5"
        style={{
          boxSizing: 'border-box',
          position: 'absolute',
          width: '200px',
          height: '60px',
          left: '340px',
          top: '456px',
          border: '2px solid #D37624',
          borderRadius: '50px',
          fontFamily: "'Open Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '140%',
          color: '#D37624',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animationDelay: '240ms'
        }}
      >
        How it Works
      </button>
      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '129px', height: '51px', left: '106px', top: '569px', fontFamily: "'Outfit', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '40px', lineHeight: '140%', color: '#F0C932', animationDelay: '320ms' }}
      >
        1000+
      </div>
      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '136px', height: '51px', left: '106px', top: '620px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '20px', lineHeight: '140%', color: '#000000', animationDelay: '320ms' }}
      >
        Courses to choose from
      </div>

      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '136px', height: '51px', left: '334px', top: '569px', fontFamily: "'Outfit', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '40px', lineHeight: '140%', color: '#2489D3', animationDelay: '400ms' }}
      >
        5000+
      </div>
      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '103px', height: '51px', left: '335px', top: '620px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '20px', lineHeight: '140%', color: '#000000', animationDelay: '400ms' }}
      >
        Students Trained
      </div>

      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '108px', height: '51px', left: '557px', top: '569px', fontFamily: "'Outfit', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '40px', lineHeight: '140%', color: '#FE753F', animationDelay: '480ms' }}
      >
        200+
      </div>
      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '135px', height: '51px', left: '557px', top: '620px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '20px', lineHeight: '140%', color: '#000000', animationDelay: '480ms' }}
      >
        Professional Trainers
      </div>
      <div 
        className="page-reveal z-10"
        style={{ position: 'absolute', width: '782px', height: '782px', left: '692px', top: '102px', animationDelay: '180ms' }}
      >
        <div className="art-float w-full h-full relative">
          <Image
            src={heroIllustration}
            alt="Top-down illustration of a desktop workspace."
            fill
            priority
            sizes="782px"
            className="object-contain"
          />
        </div>
      </div>
      <Link
        href="/signin"
        className="page-reveal z-10 hover:opacity-80 transition-opacity"
        style={{
          boxSizing: 'border-box',
          position: 'absolute',
          width: '115px',
          height: '38px',
          left: '1194px',
          top: '11px',
          border: '2px solid #D37624',
          borderRadius: '50px',
          fontFamily: "'Open Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '140%',
          color: '#D37624',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Login
      </Link>
      <Link
        href="/signin"
        className="page-reveal z-10 hover:opacity-80 transition-opacity"
        style={{
          position: 'absolute',
          width: '115px',
          height: '38px',
          left: '1329px',
          top: '11px',
          background: '#D37624',
          borderRadius: '50px',
          fontFamily: "'Open Sans', sans-serif",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '140%',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        Sign In
      </Link>

      <a href="#" className="page-reveal z-10 hover:opacity-80 transition-opacity flex items-center justify-center" style={{ position: 'absolute', width: '54px', height: '25px', left: '510px', top: '23px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '18px', lineHeight: '140%', color: '#D37624' }}>Home</a>
      <a href="#" className="page-reveal z-10 hover:opacity-100 transition-opacity flex items-center justify-center" style={{ position: 'absolute', width: '100px', height: '25px', left: '595px', top: '23px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '18px', lineHeight: '140%', color: '#000000', opacity: 0.6 }}>Companies</a>
      <a href="#" className="page-reveal z-10 hover:opacity-100 transition-opacity flex items-center justify-center" style={{ position: 'absolute', width: '90px', height: '25px', left: '715px', top: '23px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '18px', lineHeight: '140%', color: '#000000', opacity: 0.6 }}>Vacancies</a>
      <a href="#" className="page-reveal z-10 hover:opacity-100 transition-opacity flex items-center justify-center" style={{ position: 'absolute', width: '82px', height: '25px', left: '835px', top: '23px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '18px', lineHeight: '140%', color: '#000000', opacity: 0.6 }}>About Us</a>

      <div style={{ position: 'absolute', width: '40px', height: '40px', left: '40px', top: '11px', background: '#D37624', borderRadius: '50%' }} className="page-reveal z-10 flex items-center justify-center">
        <span style={{ fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '20px', lineHeight: '140%', color: '#FFFFFF' }}>FC</span>
      </div>
      <div style={{ position: 'absolute', width: '150px', height: '28px', left: '94px', top: '17px', fontFamily: "'Open Sans', sans-serif", fontStyle: 'normal', fontWeight: 700, fontSize: '20px', lineHeight: '140%', color: '#D37624', opacity: 0.9 }} className="page-reveal z-10 flex items-center justify-start">
        FairConnect
      </div>
    </div>
  );
}
