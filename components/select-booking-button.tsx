"use client";

import Link from "next/link";
import { useState } from "react";

type SelectBookingButtonProps = {
  companyId: string;
  companyName: string;
  isAuthenticated: boolean;
  initiallySelected?: boolean;
};

type BookingApiResponse = {
  success?: boolean;
  error?: string;
};

const DEFAULT_BOOKING_DATE = "2022-05-10T09:00:00.000Z";

export default function SelectBookingButton({
  companyId,
  companyName,
  isAuthenticated,
  initiallySelected = false,
}: SelectBookingButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [hasSelected, setHasSelected] = useState(initiallySelected);

  async function handleSelect() {
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/companies/${companyId}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingDate: DEFAULT_BOOKING_DATE,
        }),
      });

      const payload = (await response.json()) as BookingApiResponse;

      if (!response.ok || payload.success === false) {
        setMessage(payload.error ?? "Unable to select this company right now.");
        return;
      }

      setHasSelected(true);
      setMessage(`${companyName} has been added to your bookings.`);
    } catch {
      setMessage("Unable to reach the booking service.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="inline-flex rounded-full border border-[#e3c7aa] bg-white px-4 py-2 text-[14px] font-bold text-[#b06f2c] transition-colors hover:bg-[#fff4ea]"
      >
        Login to select
      </Link>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleSelect}
        disabled={isSubmitting || hasSelected}
        className="inline-flex rounded-full bg-[#dd7f21] px-4 py-2 text-[14px] font-bold text-white transition-colors hover:bg-[#c56f1f] disabled:cursor-not-allowed disabled:bg-[#ebb07a]"
      >
        {hasSelected ? "Selected" : isSubmitting ? "Selecting..." : "Select"}
      </button>
      {message ? <p className="text-[13px] text-black/55">{message}</p> : null}
    </div>
  );
}
