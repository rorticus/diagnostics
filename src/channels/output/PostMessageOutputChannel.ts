import { DiagnosticOutputChannel, DiagnosticChannelMessage } from '../../interfaces';

export class PostMessageOutputChannel implements DiagnosticOutputChannel {
	broadcast(message: DiagnosticChannelMessage): void {
		window.postMessage(message, '*');
	}
}
