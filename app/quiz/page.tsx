'use client'
import React, { useState } from 'react'

export default function QuizPage() {
  const [values, setValues] = useState({ gender: '', sizes: '', colors: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const brief = {
        ...values,
        sizes: values.sizes ? values.sizes.split(',').map((s) => s.trim()) : [],
        colors: values.colors ? values.colors.split(',').map((s) => s.trim()) : []
      }

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error generating outfits')
      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center">Style Quiz</h1>
      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Gender</span>
          <select
            name="gender"
            onChange={handleChange}
            className="border rounded p-2"
            required
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-sm font-medium">Sizes (comma separated)</span>
          <input
            type="text"
            name="sizes"
            onChange={handleChange}
            placeholder="S, M, L"
            className="border rounded p-2"
          />
        </label>

        <label className="flex flex-col col-span-2">
          <span className="mb-1 text-sm font-medium">Colors (comma separated)</span>
          <input
            type="text"
            name="colors"
            onChange={handleChange}
            placeholder="Black, White, Beige"
            className="border rounded p-2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-black text-white rounded py-2 mt-4 hover:bg-gray-800 transition"
        >
          {loading ? 'Generating...' : 'Generate Looks'}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Results</h2>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
