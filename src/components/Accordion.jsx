import { useState } from 'react'
import './Accordion.css'

export function AccordionItem({ question, answer, isOpen, onToggle, icon }) {
  return (
    <div className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        type="button"
      >
        {icon && <span className="accordion-icon">{icon}</span>}
        <span className="accordion-question">{question}</span>
        <svg
          className="accordion-chevron"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="accordion-content-wrapper">
        <div className="accordion-content">
          {typeof answer === 'string' ? <p>{answer}</p> : answer}
        </div>
      </div>
    </div>
  )
}

export function AccordionGroup({ items, allowMultiple = false, defaultOpen = null }) {
  const [openItems, setOpenItems] = useState(
    defaultOpen !== null ? (Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]) : []
  )

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className="accordion-group">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          icon={item.icon}
          isOpen={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}

export default AccordionGroup
