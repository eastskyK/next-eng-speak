import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy | EastSky21 English Studio",
  description: "EastSky21 개인정보처리방침.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f5efe6] px-6 py-14 text-slate-900 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Privacy Policy
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            개인정보처리방침
          </h1>
          <p className="text-base text-slate-600">
            본 개인정보처리방침은 EastSky21(이하 “사이트”)가 제공하는
            서비스에서 개인정보를 어떻게 처리하는지 설명합니다.
          </p>
        </header>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">1. 수집하는 정보</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>사용자가 문의 이메일을 통해 자발적으로 제공하는 정보</li>
            <li>서비스 이용 과정에서 자동 수집될 수 있는 정보</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">2. 이용 목적</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>문의 응대 및 사용자 지원</li>
            <li>사이트 품질 개선 및 통계 분석</li>
            <li>광고 제공 및 광고 성과 측정</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">3. 쿠키 사용</h2>
          <p className="leading-relaxed">
            사이트는 더 나은 사용자 경험 제공, 통계 분석 및 광고 제공을 위해
            쿠키를 사용할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">
            4. Google AdSense 및 제3자 광고
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Google 및 제3자 공급업체는 쿠키를 사용하여 광고를 제공합니다.</li>
            <li>
              사용자의 이전 방문 기록을 기반으로 개인화된 광고가 표시될 수
              있습니다.
            </li>
            <li>
              사용자는 광고 설정 또는 브라우저 설정을 통해 쿠키 저장을 거부할
              수 있습니다.
            </li>
          </ul>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">5. 보관 및 파기</h2>
          <p className="leading-relaxed">
            수집된 정보는 이용 목적 달성 후 지체 없이 파기합니다. 다만, 관련
            법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">6. 문의</h2>
          <p>개인정보 관련 문의: eastsky21@gmail.com</p>
          <p className="text-xs text-slate-500">최종 업데이트: 2026-02-15</p>
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
