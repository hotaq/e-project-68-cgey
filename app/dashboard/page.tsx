import { redirect } from "next/navigation";

import AdminBookingsTable, { type AdminBooking } from "@/components/admin-bookings-table";
import AdminReviewsTable, { type AdminReview } from "@/components/admin-reviews-table";
import SiteHeader from "@/components/site-header";
import { buildBackendUrl, getAuthToken } from "@/lib/backend";
import { getCurrentUser } from "@/lib/auth";
import { openSans, outfit } from "@/lib/fonts";

type RawBooking = {
  _id: string;
  bookingDate: string;
  createdAt: string;
  user: string | { _id: string; name: string; email?: string };
  company: string | { _id: string; name: string };
};

type UserInfo = {
  _id: string;
  name: string;
  email?: string;
};

async function fetchUserInfo(token: string, userId: string): Promise<UserInfo | null> {
  try {
    const response = await fetch(buildBackendUrl(`/users/${userId}`), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.data ?? null;
  } catch {
    return null;
  }
}

async function getAllBookings(token: string): Promise<AdminBooking[]> {
  try {
    const response = await fetch(buildBackendUrl("/bookings"), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const payload = await response.json();
    const rawBookings: RawBooking[] = Array.isArray(payload.data) ? payload.data : [];

    // Collect unique user IDs that need resolving
    const userIdsToResolve = new Set<string>();
    for (const b of rawBookings) {
      if (typeof b.user === "string") userIdsToResolve.add(b.user);
    }

    // Fetch user info for each unique user ID
    const userMap = new Map<string, UserInfo>();
    const userFetches = Array.from(userIdsToResolve).map(async (userId) => {
      const info = await fetchUserInfo(token, userId);
      if (info) userMap.set(userId, info);
    });
    await Promise.all(userFetches);

    // Replace string user IDs with populated user objects
    return rawBookings.map((b) => ({
      ...b,
      user: typeof b.user === "string"
        ? userMap.get(b.user) ?? { _id: b.user, name: b.user }
        : b.user,
    }));
  } catch {
    return [];
  }
}

async function getAllReviews(token: string): Promise<AdminReview[]> {
  try {
    const response = await fetch(buildBackendUrl("/reviews"), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const payload = await response.json();
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/");
  }

  const token = (await getAuthToken()) ?? "";

  const [bookings, reviews] = await Promise.all([
    getAllBookings(token),
    getAllReviews(token),
  ]);

  return (
    <div className="min-h-dvh bg-[#f8f8f8]">
      <SiteHeader
        activePath="/dashboard"
        currentUser={currentUser}
        navClassName="absolute left-1/2 top-[23px] hidden h-[25px] -translate-x-1/2 items-center justify-between gap-8 md:flex"
      />

      <main className="px-4 pb-10 pt-[94px] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px] space-y-10">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dc3545]/10">
                <span className="text-[14px]">🛡️</span>
              </div>
              <h1 className={`${outfit.className} text-[28px] font-bold text-[#1e1e1e]`}>
                Admin Dashboard
              </h1>
            </div>
            <p className={`${openSans.className} text-[15px] text-black/50`}>
              Manage all bookings and reviews across the platform.
            </p>
          </div>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`${outfit.className} text-[22px] font-bold text-[#1e1e1e]`}>
                All Bookings
              </h2>
              <span className={`${openSans.className} rounded-full bg-[#dd7f21]/10 px-3 py-1 text-[13px] font-semibold text-[#dd7f21]`}>
                {bookings.length} booking{bookings.length === 1 ? "" : "s"}
              </span>
            </div>
            <AdminBookingsTable initialBookings={bookings} />
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`${outfit.className} text-[22px] font-bold text-[#1e1e1e]`}>
                All Reviews
              </h2>
              <span className={`${openSans.className} rounded-full bg-[#2c7bc9]/10 px-3 py-1 text-[13px] font-semibold text-[#2c7bc9]`}>
                {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </span>
            </div>
            <AdminReviewsTable initialReviews={reviews} />
          </section>
        </div>
      </main>
    </div>
  );
}
