import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About | EastSky21 English Studio",
  description:
    "한국어 문장을 영어로 말하는 연습을 돕는 EastSky21 영어 학습 페이지 소개.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5efe6] px-6 py-14 text-slate-900 md:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            About
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            EastSky21 영어 학습 공간
          </h1>
          <p className="text-base text-slate-600">
            EastSky21은 한국어 문장을 영어로 바꾸어 말하는 연습을 매일 짧게
            반복할 수 있도록 돕는 개인 학습 공간입니다.
          </p>
        </header>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold">학습 목표</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            한국어 문장을 보고 바로 영어로 떠올리는 속도를 높이고, 입으로
            말하면서 자연스러운 문장 구조를 익히는 것을 목표로 합니다.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>매일 짧고 실용적인 문장으로 부담 없이 학습</li>
            <li>청취와 말하기를 동시에 자극하는 반복 연습</li>
            <li>정답 문장 비교로 표현의 차이를 빠르게 파악</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold">콘텐츠 운영 원칙</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>실제로 말하기 좋은 문장 위주로 구성합니다.</li>
            <li>일상·업무 대화에 바로 쓰일 수 있는 표현을 우선합니다.</li>
            <li>콘텐츠는 학습 흐름에 맞게 지속적으로 개선됩니다.</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-3xl border border-white/80 bg-white/85 p-6 text-sm text-slate-600 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)]">
          <h2 className="text-xl font-semibold text-slate-900">운영자</h2>
          <p>운영: EastSky21</p>
          <p>문의: eastsky21@gmail.com</p>
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
