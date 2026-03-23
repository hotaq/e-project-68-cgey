import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="macbook-frame mx-auto shrink-0 text-foreground overflow-hidden relative z-0 bg-white">
      {/* Your 1512x982 Sign In Layout Starts Here */}
      <div className="flex h-full w-full">
        {/* Left Side / Image Area Placeholder */}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center border-r border-gray-200">
          <div className="text-center">
             <div className="text-3xl font-bold text-gray-400 mb-4">Image Area</div>
             <p className="text-gray-400">Dimensions: 756 x 982</p>
          </div>
        </div>

        {/* Right Side / Sign In Form */}
        <div className="flex w-1/2 flex-col justify-center px-24">
          <h1 className="font-display text-5xl font-bold">Sign In</h1>
          <p className="mt-4 text-lg text-black opacity-60">
            Welcome back! Please enter your details.
          </p>
          
          <div className="mt-8 flex flex-col gap-4">
            {/* Form Placeholder */}
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-brand-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-brand-orange focus:outline-none"
              />
            </div>
            <button className="mt-4 w-full rounded-full bg-brand-orange py-3 font-semibold text-white transition-opacity hover:opacity-90">
              Sign In
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/" className="text-sm font-semibold text-brand-orange hover:underline">
              Go back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
