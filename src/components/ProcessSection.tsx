import { ArrowDownRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Decode the problem',
    description:
      'Understand the real goal, the constraints, the people who will use it, and what a trustworthy final output actually needs to look like.',
  },
  {
    number: '02',
    title: 'Build the system',
    description:
      'Convert the creative problem into reusable workflows, naming conventions, prompt structures, references, and automation logic.',
  },
  {
    number: '03',
    title: 'Generate and refine',
    description:
      'Use AI models — diffusion, LLMs, RAG — to generate candidates, then iterate while preserving identity, accuracy, and continuity.',
  },
  {
    number: '04',
    title: 'Automate the repeatable',
    description:
      'Create dashboards, calculators, templates, and AI-assisted tools for tasks that should not be manually repeated.',
  },
  {
    number: '05',
    title: 'Deliver with clarity',
    description:
      'Ship the result as a usable product — clear UI, explained outputs, reports, and handoff-ready assets people can trust.',
  },
]

export default function ProcessSection() {
  return (
    <section id="systems" className="section process-section">
      <div className="page-width">
        <div className="process-intro">
          <h2>How I Work</h2>
          <p className="body-copy">
            My process combines creative intuition with structured systems thinking — turning
            messy ideas into production-ready workflows.
          </p>
        </div>
        <ol className="process-list">
          {steps.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p className="body-copy">{step.description}</p>
              <ArrowDownRight size={22} strokeWidth={1.3} aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
