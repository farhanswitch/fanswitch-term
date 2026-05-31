'use client';

interface QuickMenuProps {
  onCommand: (cmd: string) => void;
  disabled?: boolean;
}

const MACROS = [
  { key: '1', label: 'Help', command: '/help' },
  { key: '2', label: 'Bio', command: '/bio' },
  { key: '3', label: 'Education', command: '/education' },
  { key: '4', label: 'Projects', command: '/projects' },
  { key: '5', label: 'CV', command: '/cv' },
  { key: '6', label: 'Socials', command: '/socials' },
  { key: '7', label: 'Clear', command: '/clear' },
];

export function QuickMenu({ onCommand, disabled }: QuickMenuProps) {
  return (
    <div className="flex flex-wrap gap-2 px-3 py-3 sm:px-4 sm:py-3 border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm">
      {MACROS.map((macro) => (
        <button
          key={macro.key}
          disabled={disabled}
          onClick={() => onCommand(macro.command)}
          className="
            group relative flex items-center gap-1.5
            px-3 py-1.5 sm:px-4 sm:py-2
            text-xs sm:text-sm font-mono
            text-zinc-400
            bg-transparent
            border border-zinc-800
            rounded-md
            transition-all duration-150 ease-out
            hover:text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-400/5
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 focus-visible:border-emerald-400/40
            active:scale-[0.97]
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-zinc-400 disabled:hover:border-zinc-800 disabled:hover:bg-transparent
          "
        >
          <span className="text-zinc-600 group-hover:text-emerald-400/60 transition-colors">[{macro.key}]</span>
          <span className="hidden min-[400px]:inline">{macro.label}</span>
          <span className="text-zinc-600 group-hover:text-zinc-500 transition-colors">({macro.command})</span>
        </button>
      ))}
    </div>
  );
}
