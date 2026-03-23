import { Open_Sans, Outfit } from "next/font/google";
import Link from "next/link";

import HeaderAuthActions from "@/components/header-auth-actions";

export const dynamic = "force-dynamic";

type Company = {
  _id: string;
  name: string;
  address: string;
  website: string;
  description: string;
  telephone: string;
  bookings?: Array<{ _id: string }>;
  reviews?: Array<{ _id: string; rating: number }>;
};

type CompaniesResponse = {
  success: boolean;
  count: number;
  data: Company[];
};

type FindJobsPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5050/api/v1";

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

const keywordTags = ["C++", "JAVA", "Malay"];

const jobTypeFilters = [
  {
    label: "Remote only",
    description: "Online-friendly fairs and virtual screening rooms.",
  },
  {
    label: "Entry level",
    description: "Graduate roles, internships, and starter programs.",
  },
  {
    label: "Fast response",
    description: "Companies actively reviewing candidates this week.",
  },
];

const skillFilters = ["Frontend", "Backend", "UI Design", "Marketing"];

const sortOptions = ["New", "Salary ascending", "Salary descending", "Rating"];

async function getCompanies(): Promise<Company[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch companies", response.status, response.statusText);
      return [];
    }

    const payload = (await response.json()) as Partial<CompaniesResponse>;

    if (!Array.isArray(payload.data)) {
      console.error("Companies response did not contain an array");
      return [];
    }

    return payload.data;
  } catch (error) {
    console.error("Unexpected error fetching companies", error);
    return [];
  }
}

function normalizeQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function matchesSearch(company: Company, query: string): boolean {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  const searchableText = [
    company.name,
    company.address,
    company.description,
    company.telephone,
    company.website,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-[#2d2d2d]"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-[#2d2d2d]"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" fill="currentColor" />
      <path
        d="M5.8 10.2L8.4 12.8L14.2 7"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-28 w-28 text-[#e1dfdf] sm:h-32 sm:w-32"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="98" height="98" rx="18" stroke="currentColor" strokeWidth="8" />
      <circle cx="84" cy="43" r="13" stroke="currentColor" strokeWidth="8" />
      <path d="M27 90L54 63L72 81L85 68L101 90" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function FindJobsPage({
  searchParams,
}: FindJobsPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = normalizeQuery(resolvedSearchParams?.q);
  const companies = await getCompanies();
  const filteredCompanies = companies.filter((company) =>
    matchesSearch(company, searchQuery),
  );

  return (
    <div className="min-h-dvh w-full bg-white">
      <header className="absolute inset-x-0 top-0 z-20 bg-white">
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
            className={`${openSans.className} absolute left-1/2 top-[23px] hidden h-[25px] w-[435px] -translate-x-1/2 items-center justify-between md:flex`}
          >
            <Link
              className="text-[18px] font-bold leading-[1.4] text-black/60 transition-colors hover:text-black"
              href="/#home"
            >
              Home
            </Link>
            <Link
              className="text-[18px] font-bold leading-[1.4] text-[#d37624] transition-colors hover:text-[#c56f1f]"
              href="/find-jobs"
            >
              Find Jobs
            </Link>
            <Link
              className="text-[18px] font-bold leading-[1.4] text-black/60 transition-colors hover:text-black"
              href="/#job-fairs"
            >
              Job Fairs
            </Link>
          </nav>

          <HeaderAuthActions
            className={`${openSans.className} absolute right-6 top-[11px] flex h-[38px] items-center gap-2 sm:right-8 lg:right-10`}
          />
        </div>
      </header>

      <main className="w-full pb-0 pt-[70px]">
        <section
          id="find-jobs"
          className="w-full border border-[#e8e8e8] border-t-[2px] border-t-[#71b2ff] bg-white px-4 py-6 sm:px-6 lg:px-8"
        >
          <div className="space-y-6 xl:flex xl:items-start xl:gap-10 xl:space-y-0">
            <aside className="rounded-[12px] border border-[#d9d9d9] bg-white p-4 sm:p-5 xl:sticky xl:top-[94px] xl:max-h-[calc(100dvh-118px)] xl:w-[264px] xl:flex-shrink-0 xl:overflow-hidden">
              <div className="space-y-6 xl:max-h-full xl:overflow-y-auto xl:pr-1">
                <div className="space-y-3">
                  <h2 className={`${openSans.className} text-[18px] font-semibold text-[#222222]`}>
                    Keywords
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {keywordTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={`${openSans.className} inline-flex items-center gap-2 rounded-[10px] bg-[#f3f3f3] px-3 py-1.5 text-[13px] font-semibold text-[#2c2c2c]`}
                      >
                        <span>{tag}</span>
                        <span className="text-[18px] leading-none">x</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {jobTypeFilters.map((filter) => (
                    <div key={filter.label} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0">
                        <CheckIcon />
                      </span>
                      <div className={`${openSans.className} min-w-0 flex-1 space-y-0.5`}>
                        <span className="block text-[17px] font-semibold leading-6 text-[#2c2c2c]">
                          {filter.label}
                        </span>
                        <span className="block text-[14px] leading-5 text-black/45 sm:leading-6">
                          {filter.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`${openSans.className} text-[16px] font-semibold text-[#2c2c2c]`}>
                      Salary
                    </span>
                    <span className={`${openSans.className} text-[14px] text-[#333333]`}>
                      $0-100
                    </span>
                  </div>
                  <div className="relative h-7">
                    <div className="absolute left-2 right-2 top-1/2 h-[8px] -translate-y-1/2 rounded-full bg-[#ebebee]" />
                    <div className="absolute left-[8%] right-[8%] top-1/2 h-[8px] -translate-y-1/2 rounded-full bg-[#d9dbe4]" />
                    <span className="absolute left-[4%] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#323232]" />
                    <span className="absolute right-[4%] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#323232]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className={`${openSans.className} text-[16px] font-semibold text-[#222222]`}>
                    Skill
                  </h3>
                  <div className="space-y-3">
                    {skillFilters.map((skill) => (
                      <div key={skill} className="flex items-center gap-3">
                        <CheckIcon />
                        <span className={`${openSans.className} text-[16px] font-semibold text-[#2c2c2c]`}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-6 xl:min-w-0 xl:flex-1">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <form
                  action="/find-jobs"
                  className="flex w-full max-w-[320px] items-center gap-3"
                  method="get"
                >
                  <label className="flex h-[46px] w-full items-center gap-3 rounded-full border border-[#d6d6d6] bg-white px-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                    <input
                      type="text"
                      name="q"
                      defaultValue={searchQuery}
                      placeholder="Search companies"
                      className={`${openSans.className} w-full border-none bg-transparent text-[16px] text-[#2a2a2a] outline-none placeholder:text-black/30`}
                    />
                    <button type="submit" aria-label="Search companies" className="shrink-0">
                      <SearchIcon />
                    </button>
                  </label>
                  {searchQuery ? (
                    <Link
                      href="/find-jobs"
                      className={`${openSans.className} text-[14px] font-semibold text-[#dd7f21] transition-colors hover:text-[#c56f1f]`}
                    >
                      Clear
                    </Link>
                  ) : null}
                </form>

                <div className="flex flex-wrap items-center gap-2">
                  {sortOptions.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      className={`${openSans.className} rounded-[12px] px-4 py-2 text-[14px] font-semibold transition-colors ${
                        index === 0
                          ? "bg-[#dd7f21] text-white"
                          : "bg-[#f3f3f3] text-black/45 hover:text-black/65"
                      }`}
                    >
                      {index === 0 ? "✓ " : ""}
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className={`${openSans.className} text-[14px] text-black/55`}>
                  {searchQuery
                    ? `Showing ${filteredCompanies.length} result${filteredCompanies.length === 1 ? "" : "s"} for “${searchQuery}”`
                    : `Showing ${filteredCompanies.length} compan${filteredCompanies.length === 1 ? "y" : "ies"}`}
                </p>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                    <article
                      key={company._id}
                      className="rounded-[12px] border border-[#d9d9d9] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex aspect-[1.05/1] items-center justify-center rounded-[4px] bg-[#f1efef]">
                        <ImagePlaceholderIcon />
                      </div>
                      <div className="pt-4">
                        <h2
                          className={`${openSans.className} text-[17px] font-semibold text-[#252525]`}
                        >
                          {company.name}
                        </h2>
                        <p
                          className={`${openSans.className} mt-1 line-clamp-2 text-[15px] text-black/50`}
                        >
                          {company.address}
                        </p>
                        <p
                          className={`${openSans.className} mt-2 line-clamp-3 text-[14px] text-black/65`}
                        >
                          {company.description}
                        </p>
                        <p
                          className={`${outfit.className} mt-3 text-[18px] font-bold text-[#2c2c2c]`}
                        >
                          {company.telephone}
                        </p>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noreferrer"
                          className={`${openSans.className} mt-3 inline-flex text-[14px] font-semibold text-[#dd7f21] transition-colors hover:text-[#c56f1f]`}
                        >
                          Visit website
                        </a>
                      </div>
                    </article>
                    ))
                  ) : (
                    <div className="rounded-[12px] border border-dashed border-[#d9d9d9] bg-white p-6 sm:col-span-2 xl:col-span-4">
                      <h2 className={`${openSans.className} text-[18px] font-semibold text-[#252525]`}>
                        {searchQuery
                          ? "No companies matched your search."
                          : "No companies available right now."}
                      </h2>
                      <p className={`${openSans.className} mt-2 text-[15px] text-black/55`}>
                        {searchQuery
                          ? "Try a company name, address, website, phone number, or a word from the description."
                          : `Make sure your backend is running at ${API_BASE_URL} and has company data in MongoDB.`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
