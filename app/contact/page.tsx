import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact | EastSky21 English Studio",
  description: "EastSky21 문의 페이지.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5efe6] px-6 py-14 text-slate-900 md:px-10">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Contact
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            문의하기
          </h1>
          <p className="text-base text-slate-600">
            사이트 관련 문의는 아래 이메일로 보내주세요.
          </p>
        </header>

        <section className="rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <p className="text-base font-semibold text-slate-900">
            Email: eastsky21@gmail.com
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            가능한 한 빠르게 확인 후 답변드리겠습니다.
          </p>
        </section>

        <Link
          className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          href="/"
        >
          ← 홈으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
