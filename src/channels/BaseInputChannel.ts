import Observable from '@dojo/core/Observable';
import { DiagnosticInputChannel, DiagnosticChannelMessage } from '../interfaces';

export abstract class BaseInputChannel implements DiagnosticInputChannel {
	abstract observe(): Observable<DiagnosticChannelMessage>;

	listen(eventId?: string): Observable<DiagnosticChannelMessage> {
		if (eventId) {
			return this.observe().filter((message) => message.eventId === eventId);
		} else {
			return this.observe();
		}
	}
}
