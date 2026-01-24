"use client"

import * as React from "react"

type Sentence = {
  file: string
  text: string
  text_ko: string
}

type DayPayload = {
  sentences: Sentence[]
}

type EnglishPracticeProps = {
  days: string[]
}

export function EnglishPractice({ days }: EnglishPracticeProps) {
  const [selectedDay, setSelectedDay] = React.useState(days[0] ?? "Day01")
  const [sentences, setSentences] = React.useState<Sentence[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [revealed, setRevealed] = React.useState<boolean[]>([])
  const [answers, setAnswers] = React.useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = React.useState(true)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const stopAudio = React.useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setIsPlaying(false)
  }, [])

  React.useEffect(() => {
    let isCancelled = false

    async function loadDay() {
      stopAudio()
      setIsLoading(true)
      setError(null)
      setCurrentIndex(0)
      setRevealed([])
      setAnswers({})

      try {
        const response = await fetch(`/api/day/${selectedDay}`)
        if (!response.ok) {
          throw new Error("Day data not found.")
        }
        const data = (await response.json()) as DayPayload
        if (!isCancelled) {
          setSentences(data.sentences ?? [])
          setRevealed(new Array(data.sentences?.length ?? 0).fill(false))
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Failed to load day.")
          setSentences([])
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadDay()

    return () => {
      isCancelled = true
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [selectedDay, stopAudio])

  const sentence = sentences[currentIndex]
  const progress =
    sentences.length > 0 ? ((currentIndex + 1) / sentences.length) * 100 : 0

  function handlePlay() {
    if (!sentence) return

    stopAudio()
    setIsPlaying(true)
    setError(null)

    const audio = new Audio(`/api/audio/${selectedDay}/${sentence.file}`)
    audioRef.current = audio

    audio.onended = () => {
      setRevealed((prev) => {
        const next = [...prev]
        next[currentIndex] = true
        return next
      })
      setIsPlaying(false)
    }

    audio.onerror = () => {
      setIsPlaying(false)
      setError("Audio failed to play.")
    }

    audio.play().catch(() => {
      setIsPlaying(false)
      setError("Audio playback was blocked.")
    })
  }

  function handlePrev() {
    if (currentIndex === 0) return
    stopAudio()
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  function handleNext() {
    if (currentIndex >= sentences.length - 1) return
    stopAudio()
    setCurrentIndex((prev) => Math.min(prev + 1, sentences.length - 1))
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5efe6] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-4rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,170,88,0.55),transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[-6rem] left-[-3rem] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(90,132,167,0.45),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.8),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.16)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-14 md:px-10">
        <header className="animate-rise space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
            English Prompt Studio
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            한국어 문장을 보고 영어로 말해보세요
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            문장을 떠올린 뒤 음성을 듣고 정답을 확인하세요. 매일 짧게
            반복하면 입이 먼저 기억합니다.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-rise rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_24px_55px_-38px_rgba(15,23,42,0.6)] backdrop-blur md:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                  Today
                </p>
                <div className="text-lg font-semibold text-slate-900">
                  {selectedDay}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Day
                </label>
                <select
                  value={selectedDay}
                  onChange={(event) => setSelectedDay(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                <span>Progress</span>
                <span>
                  {sentences.length === 0 ? 0 : currentIndex + 1} /{" "}
                  {sentences.length}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  한국어 문장
                </p>
                <p className="mt-3 text-lg font-semibold leading-relaxed text-slate-900">
                  {isLoading
                    ? "불러오는 중..."
                    : sentence?.text_ko ?? "문장이 없습니다."}
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  영어로 만들어보기
                </label>
                <textarea
                  value={answers[currentIndex] ?? ""}
                  onChange={(event) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentIndex]: event.target.value,
                    }))
                  }
                  placeholder="여기에 영어 문장을 적어 보세요."
                  className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlay}
                  disabled={!sentence || isPlaying || isLoading}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_15px_30px_-18px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isPlaying ? "재생 중..." : "음성 듣기"}
                </button>
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0 || isLoading}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  이전 문장
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex >= sentences.length - 1 || isLoading}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  다음 문장
                </button>
              </div>

              {error ? (
                <p className="text-sm font-medium text-rose-500">{error}</p>
              ) : null}
            </div>
          </div>

          <div className="animate-rise rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.5)] backdrop-blur md:p-8">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              <span>Reveal</span>
              <span>{selectedDay}</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  음성을 듣고 확인
                </p>
                <p className="mt-4 text-lg font-semibold leading-relaxed">
                  {revealed[currentIndex] && sentence
                    ? sentence.text
                    : "음성을 듣고 나면 영어 문장이 여기에 표시됩니다."}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Study Tip
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  내 답안과 정답을 비교하면서 문장 구조를 다시 따라 읽어보세요.
                  입으로 한번 더 말하면 기억이 오래 남습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
