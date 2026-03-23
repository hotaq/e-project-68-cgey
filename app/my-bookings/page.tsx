import { Open_Sans, Outfit } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

import HeaderAuthActions from "@/components/header-auth-actions";
import MyBookingsSwitcher from "@/components/my-bookings-switcher";
import { getCurrentUser } from "@/lib/auth";
import { getCurrentUserBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700"],
});

const headerShell =
  "mx-auto relative h-[70px] w-full max-w-[1512px] px-6 sm:px-8 lg:px-10";

const bookingClassOptions = ["All", "Business", "Economy", "First Class"];

const departureSlots = [
  "1:35 PM - 4:25 PM",
  "4:45 PM - 7:10 PM",
  "8:10 PM - 10:30 PM",
];

type MyBookingsPageProps = {
  searchParams?: Promise<{
    selected?: string | string[];
  }>;
};

function normalizeValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function FilterPanel({ selectedCompanyNames }: { selectedCompanyNames: string[] }) {
  return (
    <aside className="rounded-[30px] border border-[#ece6df] bg-white/92 p-5 shadow-[0_24px_70px_rgba(190,155,113,0.08)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          aria-label="Close filters"
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#1d1d1f] transition-colors hover:bg-[#f8f2ea]"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className={`${outfit.className} text-[28px] text-[#111111]`}>Filter</h2>

        <button
          type="button"
          className={`${openSans.className} text-[16px] font-semibold text-[#3478f6] transition-colors hover:text-[#255fca]`}
        >
          Reset
        </button>
      </div>

      <div className="mt-10 space-y-8">
        <div className="space-y-4">
          <h3 className={`${openSans.className} text-[18px] font-semibold text-[#1c1c1e]`}>
            Booking type
          </h3>
          <div className="flex flex-wrap gap-3">
            {bookingClassOptions.map((option, index) => {
              const isActive = index === 1;

              return (
                <button
                  key={option}
                  type="button"
                  className={`${openSans.className} rounded-[18px] border px-5 py-3 text-[15px] font-semibold transition-colors ${
                    isActive
                      ? "border-[#dd7f21] bg-[#dd7f21] text-white"
                      : "border-[#d5dbe6] bg-white text-[#8a95a5] hover:border-[#dd7f21]/40 hover:text-[#4b5563]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className={`${openSans.className} text-[18px] font-semibold text-[#1c1c1e]`}>
              Price Range
            </h3>
          </div>
          <div className="flex items-center justify-between text-[16px] font-semibold text-[#3a3a3d]">
            <span>200 $</span>
            <span>900 $</span>
          </div>
          <div className="relative h-8">
            <div className="absolute left-1 right-1 top-1/2 h-[9px] -translate-y-1/2 rounded-full bg-[#d9dde5]" />
            <div className="absolute left-[22%] right-[18%] top-1/2 h-[9px] -translate-y-1/2 rounded-full bg-[#dd7f21]" />
            <span className="absolute left-[19%] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#dd7f21] shadow-[0_8px_18px_rgba(221,127,33,0.24)]" />
            <span className="absolute right-[15%] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#dd7f21] shadow-[0_8px_18px_rgba(221,127,33,0.24)]" />
          </div>
        </div>

        <details className="group relative">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[22px] bg-[#f6f4f1] p-4">
            <div>
              <h3 className={`${openSans.className} text-[18px] font-semibold text-[#1c1c1e]`}>
                Companies
              </h3>
              <p className={`${openSans.className} mt-1 text-[14px] text-[#8c8f96]`}>
                {selectedCompanyNames.length} selected
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`${openSans.className} text-[15px] font-semibold text-[#dd7f21] transition-colors group-hover:text-[#c56f1f]`}
              >
                Select All
              </span>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-[#5e6168] transition-transform group-open:rotate-180"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </summary>

          <div className="pointer-events-none absolute left-0 right-0 top-full z-20 mt-3 rounded-[22px] border border-[#ece6df] bg-white p-4 opacity-0 shadow-[0_24px_50px_rgba(150,120,84,0.18)] transition-all group-open:pointer-events-auto group-open:opacity-100">
            <div className="space-y-3">
              {selectedCompanyNames.map((company) => (
                <div
                  key={company}
                  className="flex items-center justify-between gap-3 rounded-[16px] bg-[#f8f8f8] px-3 py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff7ef] text-[12px] font-bold text-[#ca7a26] shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                      {company.slice(0, 2)}
                    </div>
                    <span className={`${openSans.className} truncate text-[15px] font-semibold text-[#1f1f21]`}>
                      {company}
                    </span>
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#dd7f21] text-white">
                    <svg
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.8 10.2L8.4 12.8L14.2 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className={`${openSans.className} text-[18px] font-semibold text-[#1c1c1e]`}>
              Time slot
            </h3>
          </div>
          <div className="flex items-center justify-between text-[16px] font-semibold text-[#3a3a3d]">
            <span>1:35 PM</span>
            <span>10:30 PM</span>
          </div>
          <div className="relative h-8">
            <div className="absolute left-1 right-1 top-1/2 h-[9px] -translate-y-1/2 rounded-full bg-[#d9dde5]" />
            <div className="absolute left-[18%] right-[28%] top-1/2 h-[9px] -translate-y-1/2 rounded-full bg-[#dd7f21]" />
            <span className="absolute left-[15%] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#dd7f21] shadow-[0_8px_18px_rgba(221,127,33,0.24)]" />
            <span className="absolute right-[25%] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#dd7f21] shadow-[0_8px_18px_rgba(221,127,33,0.24)]" />
          </div>
          <p className={`${openSans.className} text-[14px] font-semibold text-[#8c8f96]`}>
            Selected: {departureSlots[0]}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-[#dd7f21] bg-white text-[#dd7f21]">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.8 10.2L8.4 12.8L14.2 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={`${openSans.className} text-[16px] font-semibold text-[#34363b]`}>
              Flexible tickets that are free to reschedule
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default async function MyBookingsPage({ searchParams }: MyBookingsPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;
  const bookings = await getCurrentUserBookings();
  const selectedBookingId = normalizeValue(resolvedSearchParams?.selected);
  const selectedCompanyNames = bookings.map((booking) => booking.company.name);

  return (
    <div className="min-h-dvh bg-[#f8f8f8]">
      <header className="absolute inset-x-0 top-0 z-20 bg-white/95 backdrop-blur-sm">
        <div className={headerShell}>
          <div
            className={`${openSans.className} absolute left-6 top-[11px] flex h-10 items-center gap-[14px] sm:left-8 lg:left-10`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d37624] text-[20px] font-bold leading-[1.4] text-white">
              MW
            </div>
            <span className="text-[20px] font-bold leading-[1.4] text-[#d37624]/90">
              My Website
            </span>
          </div>

          <nav
            className={`${openSans.className} absolute left-1/2 top-[23px] hidden h-[25px] w-[520px] -translate-x-1/2 items-center justify-between md:flex`}
          >
            <Link
              href="/"
              className="text-[18px] font-bold leading-[1.4] text-black/60 transition-colors hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/find-jobs"
              className="text-[18px] font-bold leading-[1.4] text-black/60 transition-colors hover:text-black"
            >
              Find Jobs
            </Link>
            <Link
              href="/my-bookings"
              className="text-[18px] font-bold leading-[1.4] text-[#d37624] transition-colors hover:text-[#c56f1f]"
            >
              My Bookings
            </Link>
          </nav>

          <HeaderAuthActions
            className={`${openSans.className} absolute right-6 top-[11px] flex h-[38px] items-center gap-2 sm:right-8 lg:right-10`}
          />
        </div>
      </header>

      <main className="px-4 pb-10 pt-[94px] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] xl:grid xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start xl:gap-8">
          <div className="space-y-6">
            <MyBookingsSwitcher bookings={bookings} initialSelectedId={selectedBookingId} />
          </div>

          <div className="mt-6 xl:mt-0">
            <FilterPanel selectedCompanyNames={selectedCompanyNames} />
          </div>
        </div>
      </main>
    </div>
  );
}
