import { cookies } from "next/headers";

const BACKEND_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:5050/api/v1";

export type BookingWithCompany = {
  _id: string;
  bookingDate: string;
  createdAt: string;
  company: {
    _id: string;
    name: string;
    address: string;
    website: string;
    photoUrl?: string;
    description: string;
    telephone: string;
  };
};

type BookingResponse = {
  success?: boolean;
  data?: BookingWithCompany[];
};

async function getCurrentUserBookings(): Promise<BookingWithCompany[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return [];
  }

  try {
    const response = await fetch(`${BACKEND_API_BASE_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BookingResponse;

    if (!Array.isArray(payload.data)) {
      return [];
    }

    return payload.data.filter((booking): booking is BookingWithCompany => Boolean(booking.company?._id));
  } catch {
    return [];
  }
}

export async function getCurrentUserBookedCompanyIds(): Promise<string[]> {
  const bookings = await getCurrentUserBookings();

  return bookings
      .map((booking) => booking.company._id)
      .filter((companyId): companyId is string => Boolean(companyId));
}

export { getCurrentUserBookings };
