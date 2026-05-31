'use client';

export function ThemeStyles({ theme }: { theme: string }) {
  if (theme === 'default' || theme === 'light') return null;

  let bg = '';
  let primary400 = '';
  let primary500 = '';
  let headerBg = '';

  if (theme === 'ubuntu') {
    bg = '#300a24';
    primary400 = '#8ae234';
    primary500 = '#4e9a06';
    headerBg = 'rgba(48, 10, 36, 0.9)'; // slightly transparent aubergine
  } else if (theme === 'cyberpunk') {
    bg = '#0f0f1b'; // Dark blue/purple
    primary400 = '#f38ba8'; // Pink
    primary500 = '#f38ba8';
    headerBg = 'rgba(15, 15, 27, 0.9)';
  } else if (theme === 'dracula') {
    bg = '#282a36';
    primary400 = '#ff79c6'; // Pink
    primary500 = '#bd93f9'; // Purple
    headerBg = 'rgba(40, 42, 54, 0.9)';
  }

  return (
    <style>{`
      /* Override terminal background */
      .bg-\\[\\#0a0a0b\\] { background-color: ${bg} !important; }
      .bg-zinc-950\\/90 { background-color: ${headerBg} !important; }
      
      /* Override text colors */
      .text-emerald-400 { color: ${primary400} !important; }
      .text-emerald-400\\/90 { color: ${primary400} !important; opacity: 0.9; }
      .text-emerald-400\\/70 { color: ${primary400} !important; opacity: 0.7; }
      .text-emerald-500 { color: ${primary500} !important; }
      
      /* Override background colors */
      .bg-emerald-500 { background-color: ${primary500} !important; }
      .bg-emerald-500\\/80 { background-color: ${primary500} !important; opacity: 0.8; }
      
      /* Override borders and carets */
      .border-emerald-400\\/40 { border-color: ${primary400} !important; opacity: 0.4; }
      .caret-emerald-400 { caret-color: ${primary400} !important; }
      
      /* Override selections and hovers */
      .selection\\:bg-emerald-400\\/20 *::selection { background-color: ${primary400}33 !important; }
      .hover\\:text-emerald-400:hover { color: ${primary400} !important; }
      .hover\\:bg-emerald-400\\/5:hover { background-color: ${primary400}0D !important; }
      .focus-visible\\:ring-emerald-400\\/50:focus-visible { --tw-ring-color: ${primary400}80 !important; }
    `}</style>
  );
}
