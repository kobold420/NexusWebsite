export function LoadingState({ text = 'Daten werden geladen …' }: { text?: string }) {
  return <div className="state-box pulse">{text}</div>;
}

export function ErrorState({ message }: { message: string }) {
  return <div className="state-box error-box">Fehler im Data Layer: {message}</div>;
}
