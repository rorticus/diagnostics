import { PostMessageOutputChannel } from './channels/output/PostMessageOutputChannel';
import { DiagnosticOutputChannel, DiagnosticEventTypes, DiagnosticsMessageInfo } from './interfaces';

const channels: DiagnosticOutputChannel[] = [];

channels.push(new PostMessageOutputChannel());

export function dlog<K extends keyof DiagnosticEventTypes>(eventId: K, info: DiagnosticEventTypes[K]): void;
export function dlog(eventId: string, info: DiagnosticsMessageInfo): void {
	const message = {
		source: 'dojo2-diagnostics',
		eventId,
		info: info,
		ts: performance.now()
	};

	channels.forEach((channel) => channel.broadcast(message));
}
