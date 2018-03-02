import { DiagnosticEventTypes, DiagnosticsMessageInfo } from './interfaces';

export function dlog<K extends keyof DiagnosticEventTypes>(eventId: K, info: DiagnosticEventTypes[K]): void;
export function dlog(eventId: string, info: DiagnosticsMessageInfo): void {
	window.postMessage(
		{
			eventId,
			info
		},
		'*'
	);
}
