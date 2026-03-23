import { Open_Sans } from "next/font/google";
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

const headerShell =
  "mx-auto relative h-[70px] w-full max-w-[1512px] px-6 sm:px-8 lg:px-10";

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

export default async function MyBookingsPage({ searchParams }: MyBookingsPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;
  const bookings = await getCurrentUserBookings();
  const selectedBookingId = normalizeValue(resolvedSearchParams?.selected);
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
        <div className="mx-auto max-w-[1500px]">
          <MyBookingsSwitcher bookings={bookings} initialSelectedId={selectedBookingId} />
        </div>
      </main>
    </div>
  );
}
