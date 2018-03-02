import { WeakMap } from '@dojo/shim/WeakMap';
import { DiagnosticEventTypes, DiagnosticsMessageInfo, DiagnosticsSimpleObject } from './interfaces';

export function dlog<K extends keyof DiagnosticEventTypes>(eventId: K, info: DiagnosticEventTypes[K]): void;
export function dlog(eventId: string, info: DiagnosticsMessageInfo): void {
	window.postMessage(
		{
			source: 'dojo2-diagnostics',
			eventId,
			info: info,
			ts: performance.now()
		},
		'*'
	);
}
