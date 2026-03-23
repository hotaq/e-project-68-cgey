"use client";

import { useEffect, useMemo, useState } from "react";
import { Open_Sans, Outfit } from "next/font/google";

import type { BookingWithCompany } from "@/lib/bookings";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["700"],
});

type MyBookingsSwitcherProps = {
  bookings: BookingWithCompany[];
  initialSelectedId?: string;
};

function formatBookingDate(
  dateValue: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    options ?? {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date);
}

function getWebsiteHost(website: string): string {
  try {
    return new URL(website).hostname.replace(/^www\./, "");
  } catch {
    return website;
  }
}

function getReferenceCode(bookingId: string): string {
  return bookingId.slice(-6).toUpperCase();
}

function DetailCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#f1ece5] bg-[#faf9f7] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <p
        className={`${openSans.className} text-[12px] font-semibold uppercase tracking-[0.12em] text-[#ab7a48]`}
      >
        {label}
      </p>
      <p
        className={`${openSans.className} mt-1.5 text-[16px] font-semibold text-[#222222] ${valueClassName ?? ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function BookingSummaryCard({
  booking,
  isActive,
  onSelect,
}: {
  booking: BookingWithCompany;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`block w-full rounded-[30px] border p-5 text-left shadow-[0_24px_70px_rgba(190,155,113,0.08)] transition-colors sm:p-6 ${
        isActive
          ? "border-[#dd7f21]/40 bg-[#fff8f0]"
          : "border-[#ece6df] bg-white/92 hover:border-[#dd7f21]/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p
          className={`${openSans.className} text-[18px] font-semibold text-[#d57a24]`}
        >
          {formatBookingDate(booking.bookingDate, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <span
          className={`${openSans.className} rounded-full px-3 py-1 text-[13px] font-semibold ${isActive ? "bg-[#dd7f21] text-white" : "bg-[#f6f4f1] text-[#6d7077]"}`}
        >
          {isActive ? "Selected" : "View"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#fff7ef] text-[15px] font-bold text-[#c97825] shadow-[0_12px_28px_rgba(0,0,0,0.06)]">
            {booking.company.name.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <h3
              className={`${openSans.className} truncate text-[18px] font-semibold text-[#111111]`}
            >
              {booking.company.name}
            </h3>
            <p
              className={`${openSans.className} mt-1 text-[15px] font-medium text-[#25a8df]`}
            >
              {getWebsiteHost(booking.company.website)}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p
            className={`${openSans.className} text-[18px] font-semibold text-[#111111]`}
          >
            Active
          </p>
          <p
            className={`${openSans.className} mt-1 text-[15px] text-[#9aa1ad]`}
          >
            Status
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 rounded-[20px] bg-[#f6f4f1] p-4">
        <div className="text-center">
          <p
            className={`${openSans.className} text-[15px] font-semibold text-[#43464d]`}
          >
            {booking.company.telephone}
          </p>
        </div>
        <div className="text-center">
          <p
            className={`${openSans.className} text-[15px] font-semibold text-[#43464d]`}
          >
            {formatBookingDate(booking.createdAt)}
          </p>
        </div>
        <div className="text-center">
          <p
            className={`${openSans.className} text-[15px] font-semibold text-[#43464d]`}
          >
            {getReferenceCode(booking._id)}
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-3 px-1 text-center text-[12px] font-medium uppercase tracking-[0.12em] text-[#9aa1ad]">
        <span>Phone</span>
        <span>Created</span>
        <span>Ref</span>
      </div>
    </button>
  );
}

export default function MyBookingsSwitcher({
  bookings,
  initialSelectedId,
}: MyBookingsSwitcherProps) {
  const [bookingItems, setBookingItems] = useState(bookings);
  const initialIndex = useMemo(() => {
    const selectedIndex = bookingItems.findIndex(
      (booking) => booking._id === initialSelectedId,
    );
    return selectedIndex >= 0 ? selectedIndex : 0;
  }, [bookingItems, initialSelectedId]);

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setBookingItems(bookings);
  }, [bookings]);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (bookingItems.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setSelectedIndex(
        (currentIndex) => (currentIndex + 1) % bookingItems.length,
      );
    }, 5000);

    return () => window.clearInterval(timer);
  }, [bookingItems.length]);

  useEffect(() => {
    if (selectedIndex >= bookingItems.length && bookingItems.length > 0) {
      setSelectedIndex(bookingItems.length - 1);
    }
  }, [bookingItems.length, selectedIndex]);

  const selectedBooking = bookingItems[selectedIndex] ?? null;

  async function handleDeleteSelectedBooking() {
    if (!selectedBooking) {
      return;
    }

    setDeleteMessage("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/bookings/${selectedBooking._id}`, {
        method: "DELETE",
      });

      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || payload.success === false) {
        setDeleteMessage(
          payload.error ?? "Unable to delete this booking right now.",
        );
        return;
      }

      setBookingItems((currentBookings) => {
        const nextBookings = currentBookings.filter(
          (booking) => booking._id !== selectedBooking._id,
        );

        setSelectedIndex((currentIndex) => {
          if (nextBookings.length === 0) {
            return 0;
          }

          return Math.min(currentIndex, nextBookings.length - 1);
        });

        return nextBookings;
      });
    } catch {
      setDeleteMessage("Unable to reach the booking service.");
    } finally {
      setIsDeleting(false);
    }
  }

  if (!selectedBooking) {
    return (
      <section className="rounded-[30px] border border-[#ece6df] bg-[linear-gradient(180deg,#fffdfa_0%,#fffaf4_100%)] p-5 shadow-[0_24px_70px_rgba(190,155,113,0.08)] sm:p-6 lg:p-7">
        <div className="rounded-[24px] border border-dashed border-[#eadfd2] bg-white/70 p-8 text-center">
          <h2 className={`${outfit.className} text-[34px] text-[#111111]`}>
            My Bookings
          </h2>
          <p
            className={`${openSans.className} mt-3 text-[16px] leading-7 text-black/55`}
          >
            You have not booked any companies yet. Go to Find Jobs and select a
            company to create your first booking.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-[#ece6df] bg-[linear-gradient(180deg,#fffdfa_0%,#fffaf4_100%)] p-5 shadow-[0_24px_70px_rgba(190,155,113,0.08)] sm:p-5 lg:p-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(440px,0.86fr)] xl:items-stretch">
          <div className="flex h-full flex-col justify-between space-y-6">
            <div className="space-y-3">
              <p
                className={`${openSans.className} text-[14px] font-semibold uppercase tracking-[0.18em] text-[#c1823d]`}
              >
                My bookings
              </p>
              <h1
                className={`${outfit.className} text-[38px] leading-[0.96] text-[#111111] sm:text-[48px] lg:text-[54px]`}
              >
                {selectedBooking.company.name}
              </h1>
              <p
                className={`${openSans.className} max-w-[34rem] text-[15px] leading-6 text-black/55`}
              >
                {`Manage your booking with ${selectedBooking.company.name}. You can review details, update the booking date, or delete this interview session.`}
              </p>
            </div>

            {bookingItems.length > 1 ? (
              <div className="flex items-center justify-start gap-2 pt-1 xl:pt-0">
                {bookingItems.map((booking, index) => {
                  const isActive = index === selectedIndex;

                  return (
                    <button
                      key={booking._id}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`Show booking ${index + 1}`}
                      className={`h-3 w-3 rounded-full transition-all ${
                        isActive
                          ? "bg-[#dd7f21]"
                          : "bg-[#d8dce5] hover:bg-[#c9ced8]"
                      }`}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="rounded-[24px] border border-[#efe6dc] bg-white/85 p-4 shadow-[0_20px_45px_rgba(160,125,83,0.08)] sm:p-5 lg:p-6 xl:h-full">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <DetailCard
                label="Company"
                value={selectedBooking.company.name}
              />
              <DetailCard label="Status" value="Interview booked" />
              <DetailCard
                label="Telephone"
                value={selectedBooking.company.telephone}
              />
              <DetailCard
                label="Website"
                value={getWebsiteHost(selectedBooking.company.website)}
                valueClassName="break-words text-[15px] leading-6 sm:text-[16px]"
              />
              <div className="sm:col-span-2">
                <DetailCard
                  label="Interview date"
                  value={formatBookingDate(selectedBooking.bookingDate, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                />
              </div>
              <div className="sm:col-span-2">
                <DetailCard
                  label="Address"
                  value={selectedBooking.company.address}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              {deleteMessage ? (
                <p
                  className={`${openSans.className} mr-auto text-[13px] font-medium text-[#b44545]`}
                >
                  {deleteMessage}
                </p>
              ) : null}
              <button
                type="button"
                onClick={handleDeleteSelectedBooking}
                disabled={isDeleting}
                className={`${openSans.className} rounded-full border border-[#e5b5b5] bg-white px-4 py-2.5 text-[14px] font-bold text-[#b44545] transition-colors hover:bg-[#fff3f3] disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {isDeleting ? "Deleting..." : "Delete booking"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {bookingItems.map((booking, index) => (
          <BookingSummaryCard
            key={booking._id}
            booking={booking}
            isActive={index === selectedIndex}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </section>
    </div>
  );
}
