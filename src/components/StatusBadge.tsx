interface StatusBadgeProps {
  status: 'QUALIFIED' | 'ELIMINATED' | 'WINNER' | 'FINALIST'
}

const statusConfig = {
  QUALIFIED: {
    bg: 'bg-lego-green',
    text: 'text-white',
    label: 'QUALIFIED',
  },
  ELIMINATED: {
    bg: 'bg-lego-red',
    text: 'text-white',
    label: 'ELIMINATED',
  },
  WINNER: {
    bg: 'bg-lego-yellow',
    text: 'text-dark',
    label: 'WINNER',
  },
  FINALIST: {
    bg: 'bg-lego-blue',
    text: 'text-white',
    label: 'FINALIST',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-block rounded-lg border-2 border-dark px-3 py-1 font-display text-xs font-bold uppercase tracking-wide ${config.bg} ${config.text} shadow-brick-sm`}
    >
      {config.label}
    </span>
  )
}
